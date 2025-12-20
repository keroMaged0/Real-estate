import { resendVerificationHandler } from "./resend-verification.controller";
import { refreshTokenHandler } from "./refresh-token.controller";
import { verifyEmailHandler } from "./verify-email.controller";
import { signinHandler } from "./signin.controller";
import { signupHandler } from "./signup.controller";
import { logoutHandler } from "./logout.controller";
import { resetPasswordHandler } from "./reset-password.controller";
import { forgotPasswordHandler } from "./forget-password.controller";
import { changePasswordHandler } from "./change-password.controller";

export const AuthController = {
  signupHandler,
  signinHandler,
  verifyEmailHandler,
  resendVerificationHandler,
  refreshTokenHandler,
  logoutHandler,
  resetPasswordHandler,
  forgotPasswordHandler,
  changePasswordHandler
};
