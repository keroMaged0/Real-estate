import { RequestHandler } from "express";

import { catchAsync } from "../../middlewares/catch-async";
import { AuthServices } from "../../services/entities/auth";
import { SuccessResponse } from "../../types/responses";
import { ResetPasswordInput } from "../../services/entities/auth/reset-password.service";

export const resetPasswordHandler: RequestHandler<
  {},
  SuccessResponse,
  ResetPasswordInput
> = catchAsync(
  async (req, res) => {
    const data = await AuthServices.resetPasswordService(req.body);

    res.status(200).json({ success: true, message: data.message });
  }
);
