import express from "express";
import upload from "../middlewares/cloudinaryUpload.js";
import { createRegistration } from "../controllers/eventController.js";

const router = express.Router();

router.post(
  "/register",
  upload.single("paymentScreenshot"),
  createRegistration
);

export default router;