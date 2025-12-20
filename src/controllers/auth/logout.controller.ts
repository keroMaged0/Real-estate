import { RequestHandler } from "express";

import { SuccessResponse } from "../../types/responses";
import { catchAsync } from "../../middlewares/catch-async";
import { AuthServices } from "../../services/entities/auth";

export const logoutHandler: RequestHandler<{}, SuccessResponse, {}> =
  catchAsync(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    await AuthServices.logoutService(refreshToken);

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  });
