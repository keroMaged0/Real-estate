import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import cors from "cors";

import { Middlewares } from "./middlewares/index";
import { env } from "./config/env";
import { apiRoutes } from "./routes";
import "./types/custom-definition";

const app = express();

app.use(express.json({ limit: "5mb" }));
app.use(cors({ origin: env.frontUrl, credentials: true }));
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(cookieParser());

app.use("/api/v1", apiRoutes);

app.use(Middlewares.routeNotFound);
app.use(Middlewares.globalErrorHandler);

export default app;
