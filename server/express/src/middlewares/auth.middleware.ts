import { Request, Response, NextFunction } from "express";
import { JwtUtil } from "../utils/jwt.util";
import { ApiError } from "../internal/api.error";

export default function authMiddleware (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if(!token) {
    throw new ApiError(401, "Unauthorized")
  } 
  const validatePayload = JwtUtil.verifyAccessToken(token);
  if(!validatePayload) {
    throw new ApiError(401, "Invalid Token")
  }
  res.locals.id = validatePayload.id;
  next();
}