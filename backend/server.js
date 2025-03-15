import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import roadmapRouter from "./Router/roadmap.router.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
// Enable CORS
app.use(cors()); // Allows all origins
app.use(cors());

app.use("/api", roadmapRouter);

app.listen(process.env.PORT, () =>
  console.log("Server running on http://localhost:3000")
);
