import userService from "./user.service";
import { Request, Response, NextFunction } from "express";
import { logger } from "../../config/logger";

interface UserResponseDTO {
  id: number;
  name: string;
  username: string;
  email: string;
}

export class UserController {

  static async getProfile(req: Request, res: Response, next: NextFunction) {
    const id = res.locals.id;
    logger.debug("Req body id from user controller " + id)
    try {
      const user = await userService.findUserById(id);
      const userResponse: UserResponseDTO = {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email
      }
      res.status(200).json(userResponse);
    } catch (error) {
      next(error);
    }
  }
}

