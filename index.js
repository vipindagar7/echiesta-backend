import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import registerEventRoute from "./routes/eventRoutes.js";
import starNightRegistration from "./routes/djNightRoutes.js";
import sponsorRoutes from "./routes/sponserRoutes.js";

dotenv.config();

const app = express();


// ✅ CORS (FIXED)
app.use(
  cors({
    origin: [
      "https://echiesta.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ✅ Handle preflight requests
app.options("*", cors());


// ✅ Middleware
app.use(express.json());


// ✅ MongoDB connection (serverless-safe)
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  const conn = await mongoose.connect(process.env.MONGO_URI);

  isConnected = conn.connections[0].readyState;
  console.log("✅ MongoDB connected");
};


// ✅ Ensure DB connection before every request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("DB Connection Error:", error);
    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});


// ✅ Routes
app.use("/api/events", registerEventRoute);
app.use("/api/star-night", starNightRegistration);
app.use("/api/sponsor", sponsorRoutes);


// ✅ Health check route
app.get("/", (req, res) => {
  res.send("🚀 Echiesta API running");
});




export default app;
