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
app.use(cors({
  origin:[ "https://echiesta.vercel.app/", "http://localhost:5173" ,"*"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));

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