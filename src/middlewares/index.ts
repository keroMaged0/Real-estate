import { allowedTo } from "./allowed-to.middleware";
import { globalErrorHandler } from "./global-error-handler";
import { authMiddleware } from "./auth.middleware";
import { catchAsync } from "./catch-async";
import { routeNotFound } from "./route-not-found.middlewares";
import { validator } from "./validate.middleware";
import { pagination } from "./pagination.middleware";
import { propertySearch } from "./search.middleware";

export const Middlewares = {
  allowedTo,
  authMiddleware,
  catchAsync,
  globalErrorHandler,
  routeNotFound,
  validator,
  pagination,
  propertySearch,
};
