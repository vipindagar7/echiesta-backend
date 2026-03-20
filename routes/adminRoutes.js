import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { stats } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats",protect,authorizeRoles("admin"),stats)

export default router;