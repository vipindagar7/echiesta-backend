import express from "express";
import { get } from "mongoose";
import { createStarNightRegistration } from "../controllers/djNightController.js";

const router = express.Router();

// Define your routes for DJ Night here
router.post('/register', createStarNightRegistration);

export default router;