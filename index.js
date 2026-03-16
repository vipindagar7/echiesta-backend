import express from "express";
import dotenv from "dotenv";
import registerRoute from "./routes/eventRoutes.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000

// CORS
app.use(cors({
  origin:["http://localhost:5000", process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to Echiesta 2024 API");
});
// routes
app.use("/api/events", registerRoute);

app.get("/", (req, res) => {
  res.send("Welcome to Echiesta 2024 API");
});
// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/echiesta")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// server start
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});