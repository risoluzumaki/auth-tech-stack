import bcrypt from "bcrypt"

export class BcryptUtil {
  static async hash(payload: string){
    return await bcrypt.hash(payload, 10);
  }

  static async compare(payload: string, hashedPayload: string){
    return await bcrypt.compare(payload, hashedPayload);
  }
}