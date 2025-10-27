import express from "express";
import cors from "cors";
import gloabalErrorHandler from "./middlewares/error.middleware";
import authRoute from "./modules/auth/auth.route";
import userRoute from "./modules/user/user.route";

export function bootstrapp () : void {
  const app = express();
  const router = express.Router();

  // Middlewares Config
  app.use(express.json());
  app.use(cors());
  
  // Routes
  router.use("/auth", authRoute);
  router.use("/user", userRoute);
  
  app.use("/api/v1",router);

  // Glocal Error Handler
  app.use(gloabalErrorHandler);

  app.listen(process.env.PORTAPP || 3000, () => {
    console.log(`Server is running on port ${process.env.PORTAPP || 3000}`)
  });
}