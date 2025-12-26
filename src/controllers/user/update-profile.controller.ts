import { RequestHandler } from "express";
import { catchAsync } from "../../middlewares/catch-async";
import { SuccessResponse } from "../../types/responses";
import { Errors } from "../../errors";
import { UserServices } from "../../services/entities/user";

export const updateProfileHandler: RequestHandler<{}, SuccessResponse, {}> =
  catchAsync(async (req, res) => {
    if (!req.loggedUser)
      throw new Errors.UnauthorizedError("User not authenticated");

    const userId = req.loggedUser?._id.toString();

    const updatedProfile = await UserServices.updateProfileService({
      userId,
      ...req.body,
    });

    res.status(200).json({
      status: "success",
      message: "User profile updated successfully",
      data: updatedProfile,
    });
  });
