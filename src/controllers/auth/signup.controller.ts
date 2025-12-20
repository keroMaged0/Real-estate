import { RequestHandler } from "express";

import { AuthServices } from "./../../services/entities/auth/index";
import { catchAsync } from "../../middlewares/catch-async";
import { SuccessResponse } from "../../types/responses";
import { SignupInput } from "../../services/entities/auth/signup.service";

export const signupHandler: RequestHandler<{}, SuccessResponse, SignupInput> =
  catchAsync(async (req, res, next) => {
    const data = await AuthServices.signupService(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data,
    });
  });
