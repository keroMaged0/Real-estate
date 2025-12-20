import { RequestHandler } from "express";

import { catchAsync } from "../../middlewares/catch-async";
import { SuccessResponse } from "../../types/responses";
import { AuthServices } from "../../services/entities/auth";
import { Errors } from "../../errors";

export const changePasswordHandler: RequestHandler<
  {},
  SuccessResponse,
  { oldPassword: string; newPassword: string }
> = catchAsync(async (req, res) => {
  if (!req.loggedUser) throw new Errors.UnauthorizedError("Unauthorized");

  const data = await AuthServices.changePasswordService({
    userId: req.loggedUser._id.toString(),
    oldPassword: req.body.oldPassword,
    newPassword: req.body.newPassword,
  });

  return res.status(200).json({
    success: true,
    message: data.message,
    data: null,
  });
});
