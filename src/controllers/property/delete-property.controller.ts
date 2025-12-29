import { RequestHandler } from "express";
import { SuccessResponse } from "../../types/responses";
import { catchAsync } from "../../middlewares/catch-async";
import { PropertyServices } from "../../services/entities/property";

export const deletePropertyHandler: RequestHandler<
  { id: string },
  SuccessResponse,
  {}
> = catchAsync(async (req, res) => {
  const { id } = req.params;
  const userId = req.loggedUser!._id;
  const userRole = req.loggedUser!.role;

  const result = await PropertyServices.deletePropertyService(
    id,
    userId,
    userRole
  );

  res.status(200).json({
    success: true,
    message: "Property deleted successfully",
    data: result,
  });
});
