import mongoose from "mongoose";

import { Property } from "../../../models";
import { Errors } from "../../../errors";
import { PropertyType, PropertyStatus, UserRole } from "../../../types";

export interface UpdatePropertyInput {
  title?: string;
  description?: string;
  price?: number;
  location?: string;
  type?: PropertyType;
  status?: PropertyStatus;
  images?: string[];
}

export const updatePropertyService = async (
  propertyId: string,
  updateData: UpdatePropertyInput,
  userId: mongoose.Types.ObjectId,
  userRole: UserRole
) => {
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    throw new Errors.BadRequestError("Invalid property ID format");
  }

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Errors.NotFoundError("Property not found");
  }

  if (
    userRole !== UserRole.ADMIN &&
    property.createdBy.toString() !== userId.toString()
  ) {
    throw new Errors.ForbiddenError("You can only update your own properties");
  }

  if (updateData.description) {
    updateData.description = updateData.description.trim();
  }

  if (updateData.title || updateData.location) {
    const titleToCheck = updateData.title || property.title;
    const locationToCheck = updateData.location || property.location;

    const existingProperty = await Property.findOne({
      _id: { $ne: propertyId },
      title: { $regex: new RegExp(`^${titleToCheck}$`, "i") },
      location: { $regex: new RegExp(`^${locationToCheck}$`, "i") },
      createdBy: property.createdBy,
      status: { $ne: PropertyStatus.SOLD },
    });
    if (existingProperty) {
      throw new Errors.ConflictError(
        "You already have a similar property in this location"
      );
    }
  }

  if (updateData.price !== undefined && updateData.price <= 0) {
    throw new Errors.BadRequestError("Price must be greater than 0");
  }

  if (
    updateData.type &&
    !Object.values(PropertyType).includes(updateData.type)
  ) {
    throw new Errors.BadRequestError(
      `Type must be one of: ${Object.values(PropertyType).join(", ")}`
    );
  }

  if (
    updateData.status &&
    !Object.values(PropertyStatus).includes(updateData.status)
  ) {
    throw new Errors.BadRequestError(
      `Status must be one of: ${Object.values(PropertyStatus).join(", ")}`
    );
  }

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  return {
    property: {
      id: updatedProperty!._id,
      title: updatedProperty!.title,
      description: updatedProperty!.description,
      price: updatedProperty!.price,
      location: updatedProperty!.location,
      type: updatedProperty!.type,
      status: updatedProperty!.status,
      images: updatedProperty!.images,
      createdBy: updatedProperty!.createdBy,
      createdAt: updatedProperty!.createdAt,
      updatedAt: updatedProperty!.updatedAt,
    },
    message: "Property updated successfully",
  };
};
