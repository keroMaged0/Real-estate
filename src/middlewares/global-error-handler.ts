import { Request, Response, NextFunction } from "express";

import { UnauthorizedError } from "../errors/unauthorized-error";
import { BadRequestError } from "../errors/bad-request-error";
import { ValidationError } from "../errors/validation-error";
import { ConflictError } from "../errors/conflict-error";
import { CustomError } from "../errors/custom-error";
import { logger } from "../utils/logger";

const mapThirdPartyError = (err: any): CustomError | null => {
  // Mongoose validation error
  if (err.name === "ValidationError" && err.errors) {
    const errors = Object.keys(err.errors).map((key) => ({
      field: key,
      message: err.errors[key].message,
    }));
    return new ValidationError(errors);
  }

  // Mongoose duplicate key
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return new ConflictError(`${field} already exists`);
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    return new BadRequestError("Invalid ID format");
  }

  // JWT errors (jsonwebtoken)
  if (err.name === "TokenExpiredError") {
    return new UnauthorizedError("Token expired");
  }
  if (err.name === "JsonWebTokenError") {
    return new UnauthorizedError("Invalid token");
  }
  if (err.name === "NotBeforeError") {
    return new UnauthorizedError("Token not active yet");
  }

  return null;
};
      
export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Map third-party -> our CustomError
  const mapped = mapThirdPartyError(err);
  if (mapped) err = mapped;

  if (err instanceof CustomError) {
    // Operational Known Error
    const response = {
      success: false,
      errors: err.serializeErrors(),
    };

    // Log at info/warn depending on status
    if (err.statusCode >= 500) logger.error(err);
    else logger.warn(err.message);

    return res.status(err.statusCode).json(response);
  }

  // Unknown / programming error
  logger.error("UNEXPECTED ERROR", err);

  const isDev = process.env.NODE_ENV !== "production";
  return res.status(500).json({
    success: false,
    errors: [
      {
        message: isDev
          ? err.message || "Internal Error"
          : "Something went wrong",
      },
    ],
  });
};
