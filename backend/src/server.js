import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";

import userRoute from "./routes/usersRouters.js";

// Config
app.use(express.json());
app.use(cors());
dotenv.config({ quiet: true });

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/user", userRoute);

// Run server
app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});
