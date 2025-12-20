import { User } from "../../../models";
import { Errors } from "../../../errors";
import { mailTransporter } from "../../../utils/mail";
import { Utils } from "../../../utils/index.";

export interface ResendVerificationInput {
  email: string;
}

export const resendVerificationService = async (
  input: ResendVerificationInput
) => {
  const { email } = input;

  const user = await User.findOne({ email });
  if (!user) throw new Errors.BadRequestError("User not found");

  if (user.isEmailVerified)
    throw new Errors.BadRequestError("Email already verified");

  if (
    user.emailVerificationCode &&
    user.emailVerificationCode.expireAt > new Date()
  )
    throw new Errors.BadRequestError(
      "A valid verification code has already been sent. Please check your email."
    );

  const verificationCode = await Utils.Crypto.generateCode(6);

  user.emailVerificationCode = {
    code: verificationCode,
    expireAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    reason: "verify-email",
  };

  await user.save();

  await mailTransporter.sendMail(user.email, {
    subject: "Resend email verification",
    html: `
      <h3>Email Verification</h3>
      <p>Your new verification code is:</p>
      <h2>${verificationCode}</h2>
      <p>This code expires in 10 minutes.</p>
    `,
  });

  return {
    message: "Verification code resent successfully",
  };
};
