import express from "express";
import { get } from "mongoose";
import { checkInStarNight, checkOutStarNight, createStarNightRegistration, deleteStarNightRegistration, getStarNightRegistrationById, getStarNightRegistrations, searchEventController } from "../controllers/djNightController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Define your routes for DJ Night here
router.post('/register', createStarNightRegistration);
router.get('/getRegistrations', protect, authorizeRoles("admin","user") , getStarNightRegistrations);
router.delete('/delete/:id', protect, authorizeRoles("admin","user") , deleteStarNightRegistration);

router.get('/getRegistration/:id', protect, authorizeRoles("admin","user","scanner") , getStarNightRegistrationById);
router.patch('/checkin/:id', protect, authorizeRoles("admin","user","scanner") , checkInStarNight);
router.patch('/checkout/:id', protect, authorizeRoles("admin","user","scanner") , checkOutStarNight);
router.get("/search",protect,authorizeRoles("admin","user","scanner"), searchEventController);

export default router; 