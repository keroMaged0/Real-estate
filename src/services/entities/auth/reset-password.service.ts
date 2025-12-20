import { Errors } from "../../../errors";
import { User } from "../../../models";
import { VerifyReason } from "../../../types/verify-reason";
import { Utils } from "../../../utils/index.";

export interface ResetPasswordInput {
  email: string;
  code: string;
  newPassword: string;
}

export const resetPasswordService = async (input: ResetPasswordInput) => {
  const { email, code, newPassword } = input;

  const user = await User.findOne({ email }).select(
    "+emailVerificationCode.code"
  );
  if (!user || !user.emailVerificationCode)
    throw new Errors.BadRequestError("User not found");

  const { code: storedCode, expireAt, reason } = user.emailVerificationCode;

  if (reason !== VerifyReason.RESET_PASSWORD)
    throw new Errors.BadRequestError(
      "This code cannot be used to reset password"
    );

  if (storedCode !== code)
    throw new Errors.BadRequestError("Invalid reset code");

  if (expireAt < new Date())
    throw new Errors.BadRequestError("Reset code has expired");

  const isSamePassword = await Utils.Bcrypt.comparePassword(
    newPassword,
    user.password
  );
  if (isSamePassword)
    throw new Errors.BadRequestError(
      "New password must be different from the old password"
    );

  user.password = newPassword;
  user.emailVerificationCode = undefined;
  await user.save();

  return { message: "Password has been reset successfully" };
};
