import mongoose, { Schema, Document } from "mongoose";
import { Bcrypt } from "../utils/bcrypt";
import { VerifyReason, UserRole } from "../types";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: UserRole;
  comparePassword(candidatePassword: string): Promise<boolean>;
  emailVerificationCode?: {
    code: string;
    expireAt: Date;
    reason: string | null;
  };
  isEmailVerified: boolean;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    isEmailVerified: { type: Boolean, default: false },
    emailVerificationCode: {
      code: { type: String, select: false },
      expireAt: { type: Date },
      reason: {
        type: String,
        enum: Object.values(VerifyReason),
        default: VerifyReason.EMAIL_VERIFICATION,
      },
    },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (this: IUser) {
  if (!this.isModified("password")) return;

  this.password = await Bcrypt.hashPassword(this.password);
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return Bcrypt.comparePassword(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
