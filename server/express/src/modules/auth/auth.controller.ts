import authService from "./auth.service";
import { AuthService } from "./auth.service";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../config/logger";
import { ApiError } from "../../internal/api.error";

export class AuthController {

  constructor(private authService: AuthService){}

  async register(req: Request, res : Response , next: NextFunction) {
    logger.debug('register controller')
    const { username, name, email, password } = req.body;
    logger.debug(email)
    logger.debug(name)
    try {
      if (!username ||!email || !password || !name) throw new ApiError(400, "Bad Request");
      await this.authService.registerUser(username, name, email, password);
      res.status(201).json({
        message: "User created successfully",
      })
    } catch (error) {
      next(error) 
    }
  }

  async login(req: Request, res : Response , next: NextFunction){
    logger.debug('login')
    logger.debug(req.body)

    const { email, password } = req.body;
    
    try {
      if (!email || !password) throw new ApiError(400, "Bad Request");
      const {accesToken, refreshToken} = await this.authService.loginUser(email, password);
      res.status(200).json({
        accesToken,
        refreshToken
      })
    } catch (error: any){
      next(error) 
    }
  }

  async refreshToken(req: Request, res : Response , next: NextFunction){
    logger.debug('refresh token')
    const { refreshToken } = req.body;
    try {
      if (!refreshToken) throw new ApiError(400, "Missing Token");
      const accesToken = await this.authService.refreshTokenUser(refreshToken);
      res.status(200).json({
        accesToken: accesToken
      })
    } catch (error) {
      next(error);
    }
  }

  // async logoutUser
  async logout(req: Request, res : Response , next: NextFunction){
    logger.debug('logout')
    const { refreshToken } = req.body;

    try {
      if (!refreshToken) throw new ApiError(400, "Missing Token");
      await this.authService.logoutUser(refreshToken);
      res.status(200).json({
        message: "Logout successfully"
      })
    } catch (error) {
      next(error);
    }
    
  }
}

export const authController = new AuthController(authService);