import { RequestHandler } from "express";

import { PropertyType, PropertyStatus } from "../types";

export const propertySearch: RequestHandler = async (req, res, next) => {
  const filter: any = {};
  const { type, status, minPrice, maxPrice, location, search } = req.query;

  if (type && Object.values(PropertyType).includes(type as PropertyType)) {
    filter.type = type;
  }

  if (
    status &&
    Object.values(PropertyStatus).includes(status as PropertyStatus)
  ) {
    filter.status = status;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
  }

  if (location && typeof location === "string") {
    filter.location = { $regex: location, $options: "i" };
  }

  if (search && typeof search === "string") {
    filter.$text = { $search: search };
  }

  if ((req as any).pagination) {
    (req as any).pagination.filter = filter;
  }

  next();
};
