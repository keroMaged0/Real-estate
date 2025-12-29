import mongoose from "mongoose";

import { Property } from "../../../models";
import { Errors } from "../../../errors";
import { User } from "./../../../models/user.model";
import { PropertyType, PropertyStatus } from "../../../types";

export interface CreatePropertyInput {
  title: string;
  description: string;
  price: number;
  location: string;
  type: PropertyType;
  status?: PropertyStatus;
  images?: string[];
  createdBy: mongoose.Types.ObjectId;
}

export const createPropertyService = async (input: CreatePropertyInput) => {
  const {
    title,
    description,
    price,
    location,
    type,
    status,
    images,
    createdBy,
  } = input;

  const user = await User.findById(createdBy);
  if (!user) {
    throw new Errors.NotFoundError("Creating user not found");
  }

  const property = await Property.create({
    title,
    description,
    price,
    location,
    type,
    status: status || PropertyStatus.AVAILABLE,
    images: images || [],
    createdBy,
  });

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
    message: "Property created successfully",
  };
};
