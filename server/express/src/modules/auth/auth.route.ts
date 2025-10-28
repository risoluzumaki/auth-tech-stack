import { Router } from "express";
import { authController } from "./auth.controller";
import { Request, Response, NextFunction } from "express";

const authRoute = Router();

// Middleware Endpoint Auth
// authRoute.use()

// Method
authRoute.post("/register", (req : Request, res : Response, next: NextFunction) => authController.register(req , res, next));
authRoute.post("/login", (req : Request, res : Response, next: NextFunction) => authController.login(req , res, next));
authRoute.post("/logout", (req: Request, res: Response, next: NextFunction) => authController.logout(req, res, next) );

export default authRoute;