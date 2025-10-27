import { logger } from "../../config/logger";
import { ApiError } from "../../internal/api.error";
import { userRepository, UserRepositoryInterface } from "./user.repository";

export class UserService {

  constructor(private readonly userRepository: UserRepositoryInterface) {}

  async findUserById(id: number) {
    logger.debug(`Finding user with id ${id}`);
    logger.debug("Unknown") 
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new ApiError(404,"User not found");
    }
    return user;
  }
  
}

const userService = new UserService(userRepository);
export default userService;