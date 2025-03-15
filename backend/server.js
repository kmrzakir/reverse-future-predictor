import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import roadmapRouter from "./Router/roadmap.router.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

app.use(cors({ origin: '*' }));

app.use("/api", roadmapRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:3000`)
);
