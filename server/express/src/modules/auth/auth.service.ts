import { UserRepositoryInterface, userRepository } from "../user/user.repository";
import { BcryptUtil } from "../../utils/bcrypt.util";
import { JwtUtil } from "../../utils/jwt.util";
import { logger } from "../../config/logger";
import { ApiError } from "../../internal/api.error";

export class AuthService {

  constructor(
    private userRepository: UserRepositoryInterface
  ) {}

  async registerUser(username: string, name : string, email: string, password: string){
    logger.debug(`Registering user with email ${email} and name ${name}`);
    
    const hashedPassword = await BcryptUtil.hash(password);
    const user = await this.userRepository.create(username, name, email, hashedPassword);
    return user;
  }

  async loginUser(email: string, password: string){
    logger.debug(`Logging in user with email ${email}`);
    
    const user = await this.userRepository.findByEmail(email);
    if(!user){
      throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await BcryptUtil.compare(password, user.password);
    if(!isPasswordValid){
      throw new ApiError(400, "Invalid password or compare");
    }

    logger.debug("Password and email are valid")

    const accesToken =  JwtUtil.generateAccessToken(user.id, user.email);
    const refreshToken = JwtUtil.generateRefreshToken(user.id, user.email);

    const saveToken = await this.userRepository.updateRefreshToken(user.id, refreshToken);
    if(!saveToken){
      throw new Error("Error saving refresh token");
    }
    return {accesToken, refreshToken};
  }

  async refreshTokenUser(refreshToken: string){

    // Check Token
    const userToken = await this.userRepository.findToken(refreshToken);
    if(!userToken){
      throw new ApiError(402,"Invalid refresh token");
    }

    // Verify Token
    const verify = JwtUtil.verifyRefreshToken(refreshToken);
    if(!verify){
      throw new ApiError(401,"Invalid refresh token");
    }

    const accessToken = JwtUtil.generateAccessToken(userToken.id, userToken.email);
    return accessToken;
  }

  async logoutUser(refreshToken: string) {
    
    // Checktoken 
    const userToken = await this.userRepository.findToken(refreshToken);
    if (!userToken) {
      throw new ApiError(402,"Invalid refresh token");
    }

    // verify token
    const verify = JwtUtil.verifyRefreshToken(refreshToken);
    if (!verify) {
      throw new ApiError(401,"Invalid refresh token");
    }

    // delete token
    const deleteToken = await this.userRepository.deleteRefreshToken(userToken.id);
    if (!deleteToken) {
      throw new ApiError(402,"Something error to delete refresh token");
    }

    return;
  }
}

const authService = new AuthService(userRepository);
export default authService;