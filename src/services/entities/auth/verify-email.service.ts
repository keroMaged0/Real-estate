import { Errors } from "../../../errors";
import { User } from "../../../models";

export interface verifyEmailInput {
  email: string;
  code: string;
}

export const verifyEmailService = async (input: verifyEmailInput) => {
  const { email, code } = input;

  const user = await User.findOne({ email }).select(
    "+emailVerificationCode.code"
  );
  
  if (!user || !user.emailVerificationCode)
    throw new Errors.BadRequestError("Invalid email or code");

  if (user.isEmailVerified)
    throw new Errors.BadRequestError("Email is already verified");

  const storedCode = user.emailVerificationCode.code;
  const expireAt = user.emailVerificationCode.expireAt;

  if (storedCode !== code)
    throw new Errors.BadRequestError("Invalid verification code");

  if (expireAt < new Date())
    throw new Errors.BadRequestError("Verification code has expired");

  user.isEmailVerified = true;
  user.emailVerificationCode = undefined;

  await user.save();

  return {
    email: user.email,
    verified: true,
  };
};
