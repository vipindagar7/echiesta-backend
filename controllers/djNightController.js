import StarNight from "../models/starNight.js";
import { sendStarNightRegistrationMail } from "../utils/sendMail.js";

export const createStarNightRegistration = async (req, res) => {
    try {
        const { name, email, phone, institute, aadhar } = req.body;

        if (!name || !email || !phone || !institute || !aadhar) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingRegistration = await StarNight.findOne({ email });

        if (existingRegistration) {
            return res.status(400).json({
                success: false,
                message: "You have already registered for DJ Night"
            });
        }

        const registration = new StarNight({
            name,
            email,
            phone,
            institute,
            aadhar
        });

        const savedRegistration = await registration.save();
        await sendStarNightRegistrationMail(name, email,registration._id);
        res.status(201).json({
            success: true,
            message: "DJ Night registration successful",
            data: savedRegistration
        });
    } catch (error) {
        console.error("Error creating DJ Night registration:", error);
        res.status(500).json({
            success: false,
            message: "Server error while creating DJ Night registration"
        });
    }
};

export const getStarNightRegistrations = async (req, res) => {
    try {
        const registrations = await StarNight.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "DJ Night registrations retrieved successfully",
            data: registrations
        });
    } catch (error) {
        console.error("Error fetching DJ Night registrations:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching DJ Night registrations"
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
                message: "DJ Night registration not found"
            });
        }

        if (registration.isCheckedIn) {
            return res.status(400).json({
                success: false,
                message: "Already checked in for DJ Night"
            });
        }

        registration.isCheckedIn = true;
        registration.checkInTime = new Date();

        const updatedRegistration = await registration.save();

        res.status(200).json({
            success: true,
            message: "Checked in successfully for DJ Night",
            data: updatedRegistration
        });
    } catch (error) {
        console.error("Error during DJ Night check-in:", error);
        res.status(500).json({
            success: false,
            message: "Server error during DJ Night check-in"
        });
    }
};