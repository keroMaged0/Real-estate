import { RequestHandler } from "express";

import { AuthServices } from "./../../services/entities/auth/index";
import { catchAsync } from "../../middlewares/catch-async";
import { SuccessResponse } from "../../types/responses";
import { env } from "../../config/env";

export const signinHandler: RequestHandler<
  {},
  SuccessResponse,
  {
    email: string;
    password: string;
  }
> = catchAsync(async (req, res, next) => {
  const data = await AuthServices.signinService({
    email: req.body.email,
    password: req.body.password,
  });

  res.cookie("refreshToken", data.refreshToken, {
    httpOnly: true,
    secure: env.ENVIRONMENT === "production",
    sameSite: env.ENVIRONMENT === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "User signed in successfully",
    data: {
      user: data.user,
      accessToken: data.accessToken,
    },
  });
});
