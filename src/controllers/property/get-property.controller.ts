import { RequestHandler } from "express";
import { SuccessResponse } from "../../types/responses";
import { catchAsync } from "../../middlewares/catch-async";
import { PropertyServices } from "../../services/entities/property";

export const getPropertyHandler: RequestHandler<
  { id: string },
  SuccessResponse
> = catchAsync(async (req, res) => {
  const { id } = req.params;
  
  const property = await PropertyServices.getPropertyService(id);

  res.status(200).json({
    success: true,
    message: "Property retrieved successfully",
    data: property,
  });
});