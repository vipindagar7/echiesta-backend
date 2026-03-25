import Registration from "../models/registrationEventModel.js";
import { sendRegistrationMail, sendRejectedMail, sendVerifiedMail } from "../utils/sendMail.js";

export const createRegistration = async (req, res) => {
    try {

        const student = JSON.parse(req.body.student);
        const events = JSON.parse(req.body.events);

        if (!student || !events || events.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Student details and events are required"
            });
        }

        let totalFee = 0;

        const processedEvents = events.map((event) => {

            let members = event.members || [];

            if (event.type.toLowerCase() === "individual") {
                members = [{ name: student.name }];
            }

            const membersCount = members.length;

            const totalEventFee = event.feePerMember * membersCount;

            totalFee += totalEventFee;

            return {
                eventName: event.eventName,
                category: event.category,
                type: event.type,
                feePerMember: event.feePerMember,
                members,
                totalEventFee
            };
        });

        // if fee > 0 screenshot required
        if (totalFee > 0 && !req.file) {
            return res.status(400).json({
                success: false,
                message: "Payment screenshot required for paid events"
            });
        }

        const registration = new Registration({
            student,
            events: processedEvents,
            totalFee,
            paymentScreenshot: req.file ? req.file.path : null
        });

        const savedRegistration = await registration.save();
        await sendRegistrationMail(student, events, totalFee);
        res.status(201).json({
            success: true,
            message: "Registration created successfully",
            data: savedRegistration
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: err,
            error: error.message
        });

    }
};

export const getAllRegistrations = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const registrations = await Registration.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Registration.countDocuments();

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalRecords: total,
            data: registrations,
        });

    } catch (error) {
        console.error("Get registrations error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching registrations",
        });
    }
};

export const getRegistrationById = async (req, res) => {
    try {
        const { id } = req.params;

        const registration = await Registration.findById(id).lean();

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found",
            });
        }

        res.status(200).json({
            success: true,
            data: registration,
        });

    } catch (error) {
        console.error("Get registration error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while fetching registration",
        });
    }
};


export const verifyRegistration = async (req, res) => {
    try {
        const { id } = req.params;

        const registration = await Registration.findByIdAndUpdate(
            id,
            {
                paymentStatus: "verified",
                paymentCheckBy: req.user.email
            },
            { new: true }
        );

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found",
            });
        }
        await sendVerifiedMail(
            registration.student,
            registration.events,
            registration.totalFee
        );
        res.status(200).json({
            success: true,
            message: "Payment verified successfully",
            data: registration,
        });

    } catch (error) {
        console.error("Verify payment error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while verifying payment",
        });
    }
};

export const rejectRegistration = async (req, res) => {
    try {
        const { id } = req.params;

        const registration = await Registration.findById(id);

        if (!registration) {
            return res.status(404).json({
                success: false,
                message: "Registration not found",
            });
        }
        registration.paymentStatus = "rejected";
        registration.paymentCheckBy = req.user.email
        registration.save()

        // send mail to 
await sendRejectedMail(
  registration.student,
  registration.events,
  registration.totalFee
);
        res.status(200).json({
            success: true,
            message: "Payment rejected & email sent",
        });

    } catch (error) {
        console.error("Reject error:", error);
        res.status(500).json({
            message: err,
        });
    }
};