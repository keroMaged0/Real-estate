import { NextFunction, Request, Response } from "express";

export const allowedTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.loggedUser;
    if (!user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }

    next();
  };
};
