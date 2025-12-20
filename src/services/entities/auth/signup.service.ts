import crypto from "crypto";

import { User } from "../../../models";
import { ConflictError } from "../../../errors/conflict-error";
import { mailTransporter } from "../../../utils/mail";
import { VerifyReason } from "../../../types/verify-reason";

export interface SignupInput {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin";
}

// Service to handle user signup
export const signupService = async (input: SignupInput) => {
  const { name, email, password } = input;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new ConflictError("Email already in use");

  const verificationCode = crypto.randomBytes(3).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    emailVerificationCode: {
      code: verificationCode,
      expireAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      reason: VerifyReason.EMAIL_VERIFICATION,
    },
  });

  await user.save();

  await mailTransporter.sendMail(user.email, {
    subject: "Verify your email",
    html: `
      <h3>Verify your email</h3>
      <p>Your verification code is:</p>
      <h2>${verificationCode}</h2>
    `,
  });

  return {
    message: "Signup successful. Please verify your email",
  };
};
