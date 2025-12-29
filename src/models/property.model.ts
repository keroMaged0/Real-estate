import mongoose, { Schema, Document } from "mongoose";
import { PropertyType, PropertyStatus } from "../types";

export interface IProperty extends Document {
  title: string;
  description: string;
  price: number;
  location: string;
  type: PropertyType;
  status: PropertyStatus;
  images: string[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const propertySchema: Schema<IProperty> = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
      index: true, // For search performance
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: true,
      min: 0.01,
      max: 999999999,
      index: true, // For price range queries
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
      index: true, // For location-based queries
    },
    type: {
      type: String,
      enum: Object.values(PropertyType),
      required: true,
      index: true, // For filtering by type
    },
    status: {
      type: String,
      enum: Object.values(PropertyStatus),
      default: PropertyStatus.AVAILABLE,
      index: true, // For filtering by status
    },
    images: {
      type: [String],
      validate: {
        validator: function (images: string[]) {
          return images.length <= 10;
        },
        message: "Maximum 10 images allowed",
      },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // For user's properties queries
    },
  },
  {
    timestamps: true,
  }
);

// Compound indexes for common queries
propertySchema.index({ status: 1, type: 1 }); // Filter by status and type
propertySchema.index({ location: 1, price: 1 }); // Location with price sorting
propertySchema.index({ createdBy: 1, createdAt: -1 }); // User's properties by date
propertySchema.index({ status: 1, createdAt: -1 }); // Available properties by date

export const Property = mongoose.model<IProperty>("Property", propertySchema);
