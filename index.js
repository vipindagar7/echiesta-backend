import express from "express";
import dotenv from "dotenv";
import registerEventRoute from "./routes/eventRoutes.js";
import starNightRegistration from "./routes/djNightRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 3000

// CORS for prod
// app.use(
//   cors({
//     origin: ,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// ✅ CORS (FIXED)
app.use(
  cors({
    origin: "https://echiesta.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// apply cors for dev mode

// app.use(
//   cors({
//     origin: "http://localhost:5173", 
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/events", registerEventRoute);
app.use("/api/star-night", starNightRegistration);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to Echiesta 2024 API");
});


mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB connected");

    app.listen(process.env.PORT || 3000, () => {
      console.log("Server running");
    });

  })
  .catch(err => {
    console.error(err);
  });