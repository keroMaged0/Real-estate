import { RequestHandler } from "express";

import { verifyEmailInput } from "../../services/entities/auth/verify-email.service";
import { AuthServices } from "../../services/entities/auth";
import { catchAsync } from "../../middlewares/catch-async";
import { SuccessResponse } from "../../types/responses";

export const verifyEmailHandler: RequestHandler<
  {},
  SuccessResponse,
  verifyEmailInput
> = catchAsync(async (req, res, next) => {
  const data = await AuthServices.verifyEmailService(req.body);

  return res.status(200).json({
    success: true,
    message: "Email verified successfully",
    data,
  });
});
