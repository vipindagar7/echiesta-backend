import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { stats } from "../controllers/adminController.js";
import { getAllCounsellor } from "../controllers/userController.js";

const router = express.Router();

router.get("/stats",protect,authorizeRoles("user","scanner"),stats)
router.get("/", protect,authorizeRoles("receptionist"),getAllCounsellor)
export default router;