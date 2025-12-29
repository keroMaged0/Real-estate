import { RequestHandler } from "express";
import { IPagination } from "../types";

export const pagination: RequestHandler = async (req, res, next) => {
  const limit = Math.min(+(req.query.limit || 10), 100);
  const page = Math.max(+(req.query.page || 1), 1);
  const skip = (page - 1) * limit;
  

  (req as any).pagination = {
    limit,
    skip,
    page,
    filter: {},
  } as IPagination;

  next();
};
