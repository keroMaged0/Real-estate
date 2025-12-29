import { RequestHandler } from "express";

import { SuccessResponse } from "../../types/responses";
import { CreatePropertyInput } from "../../services/entities/property/create-property.service";
import { catchAsync } from "../../middlewares/catch-async";
import { PropertyServices } from "../../services/entities/property";

export const createPropertyHandler: RequestHandler<
  {},
  SuccessResponse,
  Omit<CreatePropertyInput, "createdBy">
> = catchAsync(async (req, res) => {
  const propertyData: CreatePropertyInput = {
    ...req.body,
    createdBy: req.loggedUser!._id,
  };

  const property = await PropertyServices.createPropertyService(propertyData);

  res.status(201).json({
    success: true,
    message: "Property created successfully",
    data: property,
  });
});
