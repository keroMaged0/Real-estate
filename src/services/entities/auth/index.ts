import { changePasswordService } from "./change-password.service";
import { forgotPasswordService } from "./forget-password.service";
import { logoutService } from "./logout.service";
import { refreshTokenService } from "./refresh-token.service";
import { resendVerificationService } from "./resend-verification.service";
import { resetPasswordService } from "./reset-password.service";
import { signinService } from "./signin.service";
import { signupService } from "./signup.service";
import { verifyEmailService } from "./verify-email.service";

export const AuthServices = {
  signinService,
  signupService,
  verifyEmailService,
  resendVerificationService,
  refreshTokenService,
  logoutService,
  resetPasswordService,
  forgotPasswordService,
  changePasswordService 
};
