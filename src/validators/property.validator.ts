import { body, param, query } from "express-validator";

import { PropertyType, PropertyStatus } from "../types";
import { Middlewares } from "../middlewares";

export const createPropertyValidators = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters")
    .notEmpty()
    .withMessage("Title is required")
    .customSanitizer((value) => value.trim()),

  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters")
    .notEmpty()
    .withMessage("Description is required")
    .customSanitizer((value) => value.trim()),

  body("price")
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value: any) => {
      const price = parseFloat(value);
      if (price <= 0) {
        throw new Error("Price must be greater than 0");
      }
      if (price > 999999999) {
        throw new Error("Price cannot exceed 999,999,999");
      }
      return true;
    })
    .toFloat(),

  body("location")
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Location must be between 3 and 200 characters")
    .notEmpty()
    .withMessage("Location is required")
    .customSanitizer((value) => value.trim()),

  body("type")
    .isIn(Object.values(PropertyType))
    .withMessage(`Type must be one of: ${Object.values(PropertyType).join(", ")}`)
    .bail(),

  body("status")
    .optional()
    .isIn(Object.values(PropertyStatus))
    .withMessage(`Status must be one of: ${Object.values(PropertyStatus).join(", ")}`)
    .bail(),

  body("images")
    .optional()
    .isArray({ max: 10 })
    .withMessage("Images must be an array with maximum 10 items")
    .custom((images: any) => {
      if (images && Array.isArray(images)) {
        for (const image of images) {
          if (typeof image !== "string") {
            throw new Error("Each image must be a string");
          }
          if (!image.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i)) {
            throw new Error("Each image must be a valid image URL (jpg, jpeg, png, gif, webp)");
          }
          if (image.length > 500) {
            throw new Error("Image URL cannot exceed 500 characters");
          }
        }
      }
      return true;
    }),

  // Security: Reject createdBy if sent in request body
  body("createdBy")
    .not()
    .exists()
    .withMessage("createdBy field is not allowed in request body"),
    
  Middlewares.validator, 
];

export const checkIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid property ID format"),
    
  Middlewares.validator, 
];

export const updatePropertyValidators = [
  param("id")
    .isMongoId()
    .withMessage("Invalid property ID format"),
    
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters")
    .customSanitizer((value) => value.trim()),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters")
    .customSanitizer((value) => value.trim()),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be a number")
    .custom((value: any) => {
      const price = parseFloat(value);
      if (price <= 0) {
        throw new Error("Price must be greater than 0");
      }
      if (price > 999999999) {
        throw new Error("Price cannot exceed 999,999,999");
      }
      return true;
    })
    .toFloat(),

  body("location")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage("Location must be between 3 and 200 characters")
    .customSanitizer((value) => value.trim()),

  body("type")
    .optional()
    .isIn(Object.values(PropertyType))
    .withMessage(`Type must be one of: ${Object.values(PropertyType).join(", ")}`)
    .bail(),

  body("status")
    .optional()
    .isIn(Object.values(PropertyStatus))
    .withMessage(`Status must be one of: ${Object.values(PropertyStatus).join(", ")}`)
    .bail(),

  body("images")
    .optional()
    .isArray({ max: 10 })
    .withMessage("Images must be an array with maximum 10 items")
    .custom((images: any) => {
      if (images && Array.isArray(images)) {
        for (const image of images) {
          if (typeof image !== "string") {
            throw new Error("Each image must be a string");
          }
          if (!image.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i)) {
            throw new Error("Each image must be a valid image URL (jpg, jpeg, png, gif, webp)");
          }
          if (image.length > 500) {
            throw new Error("Image URL cannot exceed 500 characters");
          }
        }
      }
      return true;
    }),

  body("createdBy").not().exists().withMessage("createdBy field is not allowed"),
  body("createdAt").not().exists().withMessage("createdAt field is not allowed"),
  body("updatedAt").not().exists().withMessage("updatedAt field is not allowed"),
  
  Middlewares.validator, 
];

export const deletePropertyValidators = [
  param("id")
    .isMongoId()
    .withMessage("Invalid property ID format"),
    
  Middlewares.validator, 
];

export const getPropertiesValidators = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be a positive integer")
    .toInt(),
    
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be between 1 and 100")
    .toInt(),
    
  query("type")
    .optional()
    .isIn(Object.values(PropertyType))
    .withMessage(`Type must be one of: ${Object.values(PropertyType).join(", ")}`),
    
  query("status")
    .optional()
    .isIn(Object.values(PropertyStatus))
    .withMessage(`Status must be one of: ${Object.values(PropertyStatus).join(", ")}`),
    
  query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Min price must be a positive number")
    .toFloat(),
    
  query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Max price must be a positive number")
    .toFloat(),
    
  query("location")
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("Location must be between 1 and 200 characters"),
    
  query("search")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Search term must be between 1 and 100 characters"),
    
  query("sortBy")
    .optional()
    .isIn(['price', 'createdAt', 'title'])
    .withMessage("Sort by must be one of: price, createdAt, title"),
    
  query("sortOrder")
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage("Sort order must be asc or desc"),
    
  Middlewares.validator,
];
