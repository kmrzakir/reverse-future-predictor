import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import roadmapRouter from "./Router/roadmap.router.js";

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

// ✅ Updated CORS configuration
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "https://zakirdar.me/reverse-future-predictor",
  "http://zakirdar.me/reverse-future-predictor",
  "https://kmrzakir.github.io/reverse-future-predictor",
  "https://reverse-future-predictor.onrender.com", // Deployed frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("🔍 Origin requesting access:", origin); // Debugging

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("🚫 Blocked by CORS:", origin); // Log blocked origins
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow credentials (cookies, auth tokens, etc.)
  })
);

app.use("/api", roadmapRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:3000`)
);
