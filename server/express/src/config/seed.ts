import prisma from "./prisma";
import { BcryptUtil } from "../utils/bcrypt.util";

async function main() {
   
  const hashedPasswordJhonDoe = await BcryptUtil.hash("jhondoe123");
  const hashedPasswordJaneDoe = await BcryptUtil.hash("janedoe123");
  const hashedPasswordBobSmith = await BcryptUtil.hash("bobsmith123");

  await prisma.users.createMany({
    data: [
      {
        name: "John Doe",
        username: "johndoe",
        email: "johndoe@gmail.com",
        password: hashedPasswordJhonDoe,
      },
      {
        name: "Jane Doe",
        username: "janedoe",
        email: "janedoe@gmail.com",
        password: hashedPasswordJaneDoe,
      },
      {
        name: "Bob Smith",
        username: "bobsmith",
        email: "bobsmith@gmail.com",
        password: hashedPasswordBobSmith,
      },
    ],
  })
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})