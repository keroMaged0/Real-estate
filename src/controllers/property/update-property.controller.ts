import { RequestHandler } from "express";

import { SuccessResponse } from "../../types/responses";
import { catchAsync } from "../../middlewares/catch-async";
import { PropertyServices } from "../../services/entities/property";
import { UpdatePropertyInput } from "../../services/entities/property/update-property.service";

export const updatePropertyHandler: RequestHandler<
  { id: string },
  SuccessResponse,
  UpdatePropertyInput
> = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const userId = req.loggedUser!._id;
  const userRole = req.loggedUser!.role;

  const property = await PropertyServices.updatePropertyService(
    id,
    updateData,
    userId,
    userRole
  );

  res.status(200).json({
    success: true,
    message: "Property updated successfully",
    data: property,
  });
});
