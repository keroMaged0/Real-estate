import { RequestHandler } from "express";

import { SuccessResponse } from "../../types/responses";
import { catchAsync } from "../../middlewares/catch-async";
import { PropertyServices } from "../../services/entities/property";

export const getPropertiesHandler: RequestHandler<{}, SuccessResponse> =
  catchAsync(async (req, res) => {
    const pagination = req.pagination!;
    const { sortBy = "createdAt", sortOrder = "desc" } = req.query;

    const properties = await PropertyServices.getPropertiesService(
      pagination,
      sortBy as string,
      sortOrder as string
    );

    res.status(200).json({
      success: true,
      message: "Properties retrieved successfully",
      data: properties,
    });
  });
