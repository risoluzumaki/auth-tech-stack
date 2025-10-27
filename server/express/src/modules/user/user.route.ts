import express from "express";
import { UserController } from "./user.controller";
import { Request, Response, NextFunction } from "express";
import authMiddleware from "../../middlewares/auth.middleware";

const userRoute = express.Router();

userRoute.use(authMiddleware)
userRoute.get("/profile",(req: Request, res: Response, next: NextFunction) => UserController.getProfile(req, res, next))

export default userRoute;