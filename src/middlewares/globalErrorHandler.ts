import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const success = false;
  const message = err.message || "Something went wrong!!!";

  return res.status(500).json({
    success,
    message,
    errorDetails: err,
  });
};

export default globalErrorHandler;
