import Registration from "../models/registrationEventModel.js";
import { sendRegistrationMail } from "../utils/sendMail.js";

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
        await sendRegistrationMail(student, events);
        res.status(201).json({
            success: true,
            message: "Registration created successfully",
            data: savedRegistration
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });

    }
};