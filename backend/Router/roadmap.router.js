import express from "express";
import { getRoadmap } from "../controllers/roadmap.controllers.js";

const router = express.Router();

// this will generate the roadmap info based on users input
router.post("/roadmap", getRoadmap);

export default router;
