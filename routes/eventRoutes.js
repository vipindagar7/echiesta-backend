import express from "express";
import upload from "../middlewares/cloudinaryUpload.js";
import { createRegistration, getAllRegistrations, getRegistrationById, rejectRegistration, verifyRegistration } from "../controllers/eventController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("paymentScreenshot"),
  createRegistration
);



router.get(
  "/event-registrations",
  protect,
  authorizeRoles("admin", "user"),
  getAllRegistrations
);

router.get(
  "/event-registrations/:id",
  protect,
  authorizeRoles("admin", "user"),
  getRegistrationById
);

router.patch(
  "/event-registrations-verify/:id",
   protect,
  authorizeRoles("admin", "user"),
  verifyRegistration
);
router.patch(
  "/event-registrations-reject/:id",
   protect,
  authorizeRoles("admin", "user"),
  rejectRegistration
);



export default router;