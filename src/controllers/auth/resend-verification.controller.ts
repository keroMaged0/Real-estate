import { RequestHandler } from "express";

import { ResendVerificationInput } from "../../services/entities/auth/resend-verification.service";
import { catchAsync } from "../../middlewares/catch-async";
import { AuthServices } from "../../services/entities/auth";
import { SuccessResponse } from "../../types/responses";

export const resendVerificationHandler: RequestHandler<
  {},
  SuccessResponse,
  ResendVerificationInput
> = catchAsync(async (req, res) => {
  const data = await AuthServices.resendVerificationService(req.body);

  return res.status(200).json({
    success: true,
    message: "Verification email sent",
    data,
  });
});
