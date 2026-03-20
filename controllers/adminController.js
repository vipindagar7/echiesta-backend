import registrationEventModel from "../models/registrationEventModel.js";
import StarNight from "../models/starNight.js";
import userModel from "../models/userModel.js";

export const stats =  async (req, res) => {
    try {
      // Replace with your actual models
      const totalEventRegistrations = await registrationEventModel.countDocuments();
      const totalConcertRegistrations = await StarNight.countDocuments();
      const checkedInConcert = await StarNight.countDocuments({ isCheckedIn:true });
      const pendingConcert = await StarNight.countDocuments({ isCheckedIn: false });

      const totalUsers = await userModel.countDocuments();
      const admins = await userModel.countDocuments({ role: "admin" });
      const users = await userModel.countDocuments({ role: "user" });

      res.json({
        totalEventRegistrations,
        totalConcertRegistrations,
        checkedInConcert,
        pendingConcert,
        totalUsers,
        admins,
        users,
      });

    } catch (err) {
      res.status(500).json({ message: err });
    }
  };