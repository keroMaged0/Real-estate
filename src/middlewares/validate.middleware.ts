import { matchedData, validationResult } from "express-validator";
import { RequestHandler } from "express";

import { Errors } from "../errors";

export const validator: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error: any) => ({
      message: error.msg,
      field: error.path || error.param,
    }));
    return next(new Errors.ValidationError(formattedErrors));
  }

  const validatedBody = matchedData(req, { locations: ["body"] });
  const validatedParams = matchedData(req, { locations: ["params"] });
  const validatedQuery = matchedData(req, { locations: ["query"] });

  if (req.body && typeof req.body === "object") {
    Object.keys(req.body).forEach((key) => delete req.body[key]);
    Object.assign(req.body, validatedBody);
  } else {
    req.body = validatedBody;
  }

  if (req.params && typeof req.params === "object") {
    Object.keys(req.params).forEach((key) => delete req.params[key]);
    Object.assign(req.params, validatedParams);
  } else {
    req.params = validatedParams;
  }

  if (req.query && typeof req.query === "object") {
    Object.keys(req.query).forEach((key) => delete (req.query as any)[key]);
    Object.assign(req.query, validatedQuery);
  } else {
    (req as any).query = validatedQuery;
  }

  next();
};
