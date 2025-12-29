import { Router } from "express";

import { authRoutes } from "./auth.route";
import { userRoutes } from "./user.routes";
import propertyRoutes from "./property.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/property", propertyRoutes);

export const apiRoutes = router;
