import registrationEventModel from "../models/registrationEventModel.js";
import StarNight from "../models/starNight.js";
import userModel from "../models/userModel.js";

export const stats = async (req, res) => {
  try {
    // Replace with your actual models
    const totalEventRegistrations = await registrationEventModel.countDocuments();
    const totalConcertRegistrations = await StarNight.countDocuments();
    const checkedInConcert = await StarNight.countDocuments({ isCheckedIn: true });
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


export const getAllCounsellor = async (req, res) => {
  try {
    const counsellors = await userModel.find({ role: "counslor" });

    res.status(200).json({
      success: true,
      count: counsellors.length,
      data: counsellors,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};