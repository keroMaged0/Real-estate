import { connectDB } from "./config/db";
import { env } from "./config/env";
import app from "./app";

import dotenv from "dotenv";

dotenv.config();

const PORT = env.PORT || 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
