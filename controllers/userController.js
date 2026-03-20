import registrationEventModel from "../models/registrationEventModel.js";
import StarNight from "../models/starNight.js";

export const stats =  async (req, res) => {
    try {
      // Replace with your actual models
      const totalEventRegistrations = await registrationEventModel.countDocuments();
      const totalConcertRegistrations = await StarNight.countDocuments();
      const checkedInConcert = await StarNight.countDocuments({ isCheckedIn:true });
      const pendingConcert = await StarNight.countDocuments({ isCheckedIn: false });

   
      res.json({
        totalEventRegistrations,
        totalConcertRegistrations,
        checkedInConcert,
        pendingConcert,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  };