import { RequestHandler } from "express";
import { Errors } from "../errors";

export const routeNotFound: RequestHandler = async (req, res, next) => {
  return next(new Errors.NotFoundError("Route not found"));
};
