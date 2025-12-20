import { RequestHandler } from "express";

import { AuthServices } from "./../../services/entities/auth/index";
import { catchAsync } from "../../middlewares/catch-async";
import { SuccessResponse } from "../../types/responses";

export const forgotPasswordHandler: RequestHandler<
  {},
  SuccessResponse,
  { email: string }
> = catchAsync(async (req, res) => {
  const data = await AuthServices.forgotPasswordService(req.body);

  res.status(200).json({ success: true, message: data.message });
});
