import express from "express";
import { get } from "mongoose";
import { checkInStarNight, createStarNightRegistration, getStarNightRegistrations } from "../controllers/djNightController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Define your routes for DJ Night here
router.post('/register', createStarNightRegistration);
router.get('/getRegistrations', protect, authorizeRoles("admin","user") , getStarNightRegistrations);
router.get('/checkIn/:id', protect, authorizeRoles("admin","user","scanner") , checkInStarNight);


export default router;