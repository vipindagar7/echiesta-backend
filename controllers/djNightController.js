import mongoose from "mongoose";
import StarNight from "../models/starNight.js";
import { sendStarNightRegistrationMail } from "../utils/sendMail.js";

export const createStarNightRegistration = async (req, res) => {
  try {
    const { name, email, phone, institute, aadhar } = req.body;

    if (!name || !email || !phone || !institute || !aadhar) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingRegistration = await StarNight.findOne({ email });

    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: "You have already registered for DJ Night",
      });
    }

    const registration = new StarNight({
      name,
      email,
      phone,
      institute,
      aadhar,
    });

    const savedRegistration = await registration.save();

    // ✅ SAFE EMAIL CALL
    try {
      await sendStarNightRegistrationMail(
        name,
        email,
        savedRegistration._id
      );
    } catch (mailError) {
      console.error("❌ Mail Error:", mailError);
    }

    res.status(201).json({
      success: true,
      message: "DJ Night registration successful",
      data: savedRegistration,
    });

  } catch (error) {
    console.error("🔥 CONTROLLER ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStarNightRegistrations = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;

    const skip = (page - 1) * limit;

    // 2. Fetch data
    const registrations = await StarNight.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await StarNight.countDocuments();

    res.status(200).json({
      success: true,
      message: "DJ Night registrations retrieved successfully",
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: registrations,
    });

  } catch (error) {
    console.error("Error fetching DJ Night registrations:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching DJ Night registrations",
    });
  }
};

export const getStarNightRegistrationById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const registration = await StarNight.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Star Night registration retrieved successfully",
      data: registration,
    });

  } catch (error) {
    console.error("Error fetching Star Night registration:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching registration",
    });
  }
};


export const checkInStarNight = async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await StarNight.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Star Night registration not found"
      });
    }

    if (registration.isCheckedIn) {
      return res.status(400).json({
        success: false,
        message: "Already checked in for Star Night"
      });
    }

    registration.isCheckedIn = true;
    registration.checkInTime = new Date();

    const updatedRegistration = await registration.save();

    res.status(200).json({
      success: true,
      message: "Checked in successfully for Star Night",
      data: updatedRegistration
    });
  } catch (error) {
    console.error("Error during Star Night check-in:", error);
    res.status(500).json({
      success: false,
      message: "Server error during Star Night check-in"
    });
  }
};
export const checkOutStarNight = async (req, res) => {
  try {
    const { id } = req.params;

    const registration = await StarNight.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Star Night registration not found"
      });
    }

    if (!registration.isCheckedIn) {
      return res.status(400).json({
        success: false,
        message: "not yet checked in for Star Night"
      });
    }

    registration.isCheckedIn = false;
    registration.checkInTime = new Date();

    const updatedRegistration = await registration.save();

    res.status(200).json({
      success: true,
      message: "Checked in successfully for Star Night",
      data: updatedRegistration
    });
  } catch (error) {
    console.error("Error during Star Night check-in:", error);
    res.status(500).json({
      success: false,
      message: "Server error during Star Night check-in"
    });
  }
};

export const searchEventController = async (req, res) => {
  try {
    const { query, uid, email } = req.query;

    let filter = {};

    if (query) {
      filter.$or = [
        { eventName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ];
    }

    if (uid) {
      filter._id = uid;
    }

    if (email) {
      filter.email = email;
    }

    const events = await StarNight.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: events.length,
      events,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


export const deleteStarNightRegistration = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const deleted = await StarNight.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Registration deleted successfully",
      data: deleted, 
    });

  } catch (error) {
    console.error("Error deleting registration:", error);

    res.status(500).json({
      success: false,
      message: "Server error while deleting registration",
    });
  }
};