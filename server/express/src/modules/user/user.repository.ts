import prisma from "../../config/prisma";
import { PrismaClient } from "@prisma/client";
import { logger } from "../../config/logger";

export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<any | null>;
  create(username: string, name: string, email: string, password: string): Promise<any>;
  findById(id: number): Promise<any | null>;
  updateRefreshToken(id: number, refreshToken: string): Promise<any>;
  findToken(token: string): Promise<any>;
  deleteRefreshToken(id: number): Promise<any>;
}

class UserRepository implements UserRepositoryInterface {

  constructor(private db: PrismaClient){}
  
  async findByEmail (email: string) : Promise<any | null>{
    logger.debug("Email user on repo" + email)
    return await this.db.users.findUnique({
      where: {
        email
      }
    })
  }

  async create(username: string, name: string, email: string, password: string) {
    return await this.db.users.create({
      data: {
        name,
        username,
        email,
        password,
      },
    })
  }

  async findById (id: number) : Promise<any | null>{
    logger.debug("Id user "+ id)
    return await this.db.users.findUnique({
      where: {
        id
      }
    })
  }

  async updateRefreshToken (id: number, refreshToken: string){
    return await this.db.users.update({
      where: {
        id
      },
      data: {
        token: refreshToken
      }
    })
  }

  async deleteRefreshToken (id: number){
    return await this.db.users.update({
      where: {
        id
      },
      data: {
        token: null
      }
    })
  }

  async findToken(token : string){
    return await this.db.users.findUnique({
      where: {
        token
      }
    })
  }
}

export const userRepository = new UserRepository(prisma);