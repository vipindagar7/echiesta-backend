import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { getCounsilingRegistrations, getGamingRegistrations, statGaming, stats } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stat", protect, authorizeRoles("admin", "user", "gamer"), statGaming)

router.get("/stats", protect, authorizeRoles("admin", "user",), stats)


router.get("/getGamingRegistrations", protect, authorizeRoles("admin", "user", "gamer"), getGamingRegistrations)
router.get("/getCounsilingRegistrations", protect, authorizeRoles("admin", "user", "gamer"), getCounsilingRegistrations)

export default router;