import { Router } from "express";

import { authRoutes } from "./auth.route";
import { userRoutes } from "./user.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export const apiRoutes = router;

