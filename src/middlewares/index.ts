import { allowedTo } from "./allowed-to.middleware";
import { globalErrorHandler } from "./global-error-handler";
import { authMiddleware } from "./auth.middleware";
import { catchAsync } from "./catch-async";
import { routeNotFound } from "./route-not-found.middlewares";

export const Middlewares = {
  allowedTo,
  authMiddleware,
  catchAsync,
  globalErrorHandler,
  routeNotFound,
};
