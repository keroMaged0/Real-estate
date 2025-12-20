import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models";
import { Utils } from "../utils/index.";

interface JwtPayload {
  id: string;
  role: "user" | "admin";
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const detected = Utils.Tokens.verifyAccessToken(token);
    
    const user = await User.findById(detected.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.loggedUser = user;
    next();
    
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" , error });
  }
};
