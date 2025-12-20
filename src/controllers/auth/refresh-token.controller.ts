import { RequestHandler } from "express";

import { AuthServices } from "./../../services/entities/auth/index";
import { catchAsync } from "../../middlewares/catch-async";
import { SuccessResponse } from "../../types/responses";
import { env } from "../../config/env";

export const refreshTokenHandler: RequestHandler<{}, {}, SuccessResponse> =
  catchAsync(async (req, res) => {
    const tokens = await AuthServices.refreshTokenService({
      refreshToken: req.cookies.refreshToken,
    });

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: env.ENVIRONMENT === "production",
      sameSite: env.ENVIRONMENT === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Access token refreshed",
      data: {
        accessToken: tokens.accessToken,
      },
    });
  });
