import mongoose from "mongoose";

import { Property } from "../../../models";
import { Errors } from "../../../errors";
import { UserRole } from "../../../types";

export const deletePropertyService = async (
  propertyId: string,
  userId: mongoose.Types.ObjectId,
  userRole: UserRole
) => {
  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    throw new Errors.BadRequestError("Invalid property ID format");
  }

  const property = await Property.findById(propertyId);
  if (!property) throw new Errors.NotFoundError("Property not found");

  if (
    userRole !== UserRole.ADMIN &&
    property.createdBy.toString() !== userId.toString()
  ) {
    throw new Errors.ForbiddenError("You can only delete your own properties");
  }

  await Property.findByIdAndDelete(propertyId);

  return {
    message: "Property deleted successfully",
    deletedProperty: {
      id: property._id,
      title: property.title,
    },
  };
};
