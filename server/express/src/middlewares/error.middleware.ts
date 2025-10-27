import { Request, Response, NextFunction } from "express";
import { ApiError } from "../internal/api.error";

function globalErrorHandler (err: Error, req_: Request, res: Response, next_: NextFunction){
  let statusCode = 500;
  let message = "Internal Server Error";
  
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    message
  })

}

export default globalErrorHandler;