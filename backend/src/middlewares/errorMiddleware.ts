import { Response } from "express";
import { ApiError } from "@helpers/ApiErrors";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  res: Response
) => {
  console.error(error);
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Internal Server Error";
  return res.status(statusCode).json({ message });
};
