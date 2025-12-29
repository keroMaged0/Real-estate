import { Router } from "express";

import * as PropertyValidators from "../validators/property.validator";
import * as PropertyControllers from "../controllers/property";
import { Middlewares } from "../middlewares";
import { UserRole } from "../types";

const router = Router();

router
  .route("/")
  .post(
    Middlewares.authMiddleware,
    Middlewares.allowedTo(UserRole.ADMIN),
    PropertyValidators.createPropertyValidators,
    PropertyControllers.createPropertyHandler
  )
  .get(
    Middlewares.pagination,
    Middlewares.propertySearch,
    PropertyValidators.getPropertiesValidators,
    PropertyControllers.getPropertiesHandler
  );

router
  .route("/:id")
  .get(
    PropertyValidators.checkIdValidator,
    PropertyControllers.getPropertyHandler
  )
  .put(
    Middlewares.authMiddleware,
    Middlewares.allowedTo(UserRole.ADMIN, UserRole.USER),
    PropertyValidators.updatePropertyValidators,
    PropertyControllers.updatePropertyHandler
  )
  .delete(
    Middlewares.authMiddleware,
    Middlewares.allowedTo(UserRole.ADMIN, UserRole.USER),
    PropertyValidators.deletePropertyValidators,
    PropertyControllers.deletePropertyHandler
  );

export default router;
