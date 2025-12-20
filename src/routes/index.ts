import { Router } from "express";
c
import { authRoutes } from "./auth.route";

const router = Router();

router.use("/auth", authRoutes);

export const apiRoutes = router;
