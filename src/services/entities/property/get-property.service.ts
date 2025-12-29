import mongoose from "mongoose";

import { Property } from "../../../models";
import { Errors } from "../../../errors";

export const getPropertyService = async (propertyId: string) => {
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    throw new Errors.BadRequestError("Invalid property ID format");
  }

  const property = await Property.findById(propertyId);

  if (!property) {
    throw new Errors.NotFoundError("Property not found");
  }

  return {
    property: {
      id: property._id,
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      type: property.type,
      status: property.status,
      images: property.images,
      createdBy: property.createdBy,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt,
    },
    message: "Property retrieved successfully",
  };
};
