import express from "express";
import { get } from "mongoose";
import { checkInStarNight, createStarNightRegistration, getStarNightRegistrationById, getStarNightRegistrations, searchEventController } from "../controllers/djNightController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Define your routes for DJ Night here
router.post('/register', createStarNightRegistration);
router.get('/getRegistrations', protect, authorizeRoles("admin","user") , getStarNightRegistrations);
router.get('/getRegistration/:id', protect, authorizeRoles("admin","user") , getStarNightRegistrationById);
router.patch('/checkIn/:id', protect, authorizeRoles("admin","user","scanner") , checkInStarNight);
router.get("/search",protect,authorizeRoles("admin","user","scanner"), searchEventController);

export default router;