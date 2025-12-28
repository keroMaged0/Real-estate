import { Request, Response, NextFunction } from "express";

import { User } from "../models";
import { UserRole } from "../types";
import { Utils } from "../utils";
import { Errors } from "../errors";

interface JwtPayload {
  id: string;
  role: UserRole;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer "))
      return next(new Errors.UnauthorizedError("Unauthorized"));

    const token = authHeader.split(" ")[1];
    const detected = Utils.Tokens.verifyAccessToken(token);

    const user = await User.findById(detected.id).select("-password");
    if (!user) return next(new Errors.UnauthorizedError("Unauthorized"));

    req.loggedUser = user;
    next();
  } catch (error) {
    return next(new Errors.UnauthorizedError("Invalid token"));
  }
};
