import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { UserController } from "../controllers/user";

const router = Router();

router.get("/profile", authMiddleware, UserController.getProfileHandler);
router.patch("/profile", authMiddleware, UserController.updateProfileHandler);

export const userRoutes = router;
