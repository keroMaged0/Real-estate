import { RequestHandler } from "express";

import { UserServices } from "./../../services/entities/user/index";
import { catchAsync } from "../../middlewares/catch-async";
import { SuccessResponse } from "../../types/responses";
import { Errors } from "../../errors";

export const getProfileHandler: RequestHandler<{}, SuccessResponse, {}> =
  catchAsync(async (req, res) => {
    if (!req.loggedUser)
      throw new Errors.UnauthorizedError("User not authenticated");

    const userId = req.loggedUser?._id.toString();

    const user = await UserServices.getProfileService(userId);

    res.status(200).json({
      status: "success",
      message: "User profile fetched successfully",
      data: user,
    });
  });
