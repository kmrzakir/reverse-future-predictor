import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import roadmapRouter from "./Router/roadmap.router.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
// Enable CORS
// app.use(cors());

// Updated CORS configuration to handle multiple origins
app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "https://zakirdar.me/reverse-future-predictor/",
        "https://kmrzakir.github.io/reverse-future-predictor",
        "https://reverse-future-predictor.onrender.com" // Deployed frontend
];
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use("/api", roadmapRouter);

app.listen(process.env.PORT, () =>
  console.log("Server running on http://localhost:3000")
);
