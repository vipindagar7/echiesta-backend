import registrationEventModel from "../models/registrationEventModel.js";
import StarNight from "../models/starNight.js";
import { StudentCounsiling } from "../models/studentCounsilor.js";
import { StudentGaming } from "../models/studentGaming.js";
import userModel from "../models/userModel.js";

export const stats = async (req, res) => {
  try {
    // Replace with your actual models
    const totalEventRegistrations = await registrationEventModel.countDocuments();
    const totalConcertRegistrations = await StarNight.countDocuments();
    const checkedInConcert = await StarNight.countDocuments({ isCheckedIn: true });
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
export const statGaming = async (req, res) => {
  try {
    // Replace with your actual models
    const totalGamingRegistrations = await StudentGaming.countDocuments();
    const totalCounsilingRegistrations = await StudentCounsiling.countDocuments();

    res.json({
      totalGamingRegistrations,
      totalCounsilingRegistrations,

    });

  } catch (err) {
    res.status(500).json({ message: err });
  }
};


export const getGamingRegistrations = async (req, res) => { 
  try {
    const gamingRegistrations = await StudentGaming.find().lean();
    res.json({ success: true, count: gamingRegistrations.length, data: gamingRegistrations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getCounsilingRegistrations = async (req, res) => {
  try {
    const counsilingRegistrations = await StudentCounsiling.find().lean();
    res.json({ success: true, count: counsilingRegistrations.length, data: counsilingRegistrations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
 }