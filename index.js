import express from "express";
import dotenv from "dotenv";
import registerRoute from "./routes/eventRoutes.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000 

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://echiesta.vercel.app");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to API");
});
// routes
app.use("/api/events", registerRoute);

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
