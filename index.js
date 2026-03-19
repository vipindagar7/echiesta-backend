import express from "express";
import dotenv from "dotenv";
import registerEventRoute from "./routes/eventRoutes.js";
import starNightRegistration from "./routes/djNightRoutes.js";
import sponsorRoutes from "./routes/sponserRoutes.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000 

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

// routes
app.use("/api/events", registerEventRoute);
app.use("/api/star-night",starNightRegistration );
// app.use("/api/sponsor",sponsorRoutes );


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