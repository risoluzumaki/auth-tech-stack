import jwt from "jsonwebtoken";
// import { envLoad } from "../config/env";

interface JwtPayload {
  id: number;
  email: string;
}


export class JwtUtil {

  static generateAccessToken(id: number, email: string): string {
    const secret = process.env.JWT_SECRET ;
    if (!secret) throw new Error("JWT_SECRET is not defined");
    const payload: JwtPayload = { id, email };
    const token = jwt.sign(payload, secret, { expiresIn: "2h" })
    return token;
  }

  static generateRefreshToken(id: number, email: string) {
    const secret = process.env.JWT_REFRESH ;
    if (!secret) throw new Error("JWT_REFRESH is not defined");
    const payload: JwtPayload = { id, email };
    return jwt.sign(payload, secret, { expiresIn: "7d" });
  }

  static verifyAccessToken(token: string): JwtPayload {
    const secret = process.env.JWT_SECRET ;
    if (!secret) throw new Error("JWT_SECRET is not defined");
    const verify =  jwt.verify(token, secret);
    return verify as JwtPayload;
  }

  static verifyRefreshToken(token: string): JwtPayload {
    const secret = process.env.JWT_REFRESH ;
    if (!secret) throw new Error("JWT_REFRESH is not defined");
    const verify =  jwt.verify(token, secret);
    return verify as JwtPayload;
  }
}
