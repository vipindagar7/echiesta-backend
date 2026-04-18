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

// app.use(
//   cors({
//     origin: "http://localhost:5173", 
//     credentials: true,
//   })
// );

// ✅ CORS (FIXED)
const allowedOrigins = [
  "https://echiesta.vercel.app",
  "https://echiesta-frontend.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      const isAllowed = allowedOrigins.some(o => origin.startsWith(o));

      if (isAllowed) {
        callback(null, true);
      } else {
        console.log("Blocked Origin:", origin); // 👈 debug
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
  })
);

// apply cors for dev mode



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