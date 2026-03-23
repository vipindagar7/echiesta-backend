import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { createUser, deleteUser, getUsers, loginController, logoutController } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginController)

router.post("/signup",protect,authorizeRoles("admin"), createUser)

router.post("/logout", protect, logoutController)
router.get("/getUsers", protect, authorizeRoles("admin"), getUsers )
router.delete("/delete/:id", protect, authorizeRoles("admin"), deleteUser)

export default router;