import { Errors } from "../../../errors";
import { User } from "../../../models";
import { VerifyReason } from "../../../types/verify-reason";
import { Utils } from "../../../utils/index.";
import { mailTransporter } from "../../../utils/mail";

export interface ForgotPasswordInput {
  email: string;
}

export const forgotPasswordService = async (input: ForgotPasswordInput) => {
  const { email } = input;

  const user = await User.findOne({ email });
  if (!user) throw new Errors.BadRequestError("User not found");

  if (user.isEmailVerified === false)
    throw new Errors.BadRequestError("Email is not verified");

  if (
    user.emailVerificationCode &&
    user.emailVerificationCode.expireAt > new Date()
  )
    throw new Errors.BadRequestError(
      "Reset code already sent. Please check your email."
    );

  const resetCode = await Utils.Crypto.generateCode(6);

  user.emailVerificationCode = {
    code: resetCode,
    expireAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
    reason: VerifyReason.RESET_PASSWORD,
  };
  await user.save();

  await mailTransporter.sendMail(user.email, {
    subject: "Password Reset Code",
    html: `
      <h3>Reset your password</h3>
      <p>Your reset code is:</p>
      <h2>${resetCode}</h2>
    `,
  });

  return { message: "Password reset code sent to email" };
};
