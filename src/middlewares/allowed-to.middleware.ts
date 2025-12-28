import { NextFunction, Request, Response } from "express";

import { UserRole } from "../types";
import { Errors } from "../errors";

export const allowedTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.loggedUser;
    if (!user || !user.role)
      return next(new Errors.UnauthorizedError("Unauthorized"));

    if (!roles.includes(user.role))
      return next(new Errors.ForbiddenError("Forbidden"));

    next();
  };
};
