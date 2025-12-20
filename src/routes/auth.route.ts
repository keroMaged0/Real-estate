import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { Middlewares } from "../middlewares";

const router = Router();

router.post("/signup", AuthController.signupHandler);
router.post("/signin", AuthController.signinHandler);
router.post("/verify-email", AuthController.verifyEmailHandler);
router.post("/resend-verification", AuthController.resendVerificationHandler);
router.post("/refresh-token", AuthController.refreshTokenHandler);
router.post("/logout", AuthController.logoutHandler);
router.post("/forgot-password", AuthController.forgotPasswordHandler);
router.post("/reset-password", AuthController.resetPasswordHandler);

router.patch(
  "/change-password",
  Middlewares.authMiddleware,
  AuthController.changePasswordHandler
);

export const authRoutes = router;
