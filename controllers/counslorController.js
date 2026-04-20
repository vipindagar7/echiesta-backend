import Admission from '../models/admissionModel.js';

// ─── Submit Form ─────────────────────────────
export const submitForm = async (req, res) => {
    try {
        const admission = new Admission(req.body);
        const saved = await admission.save();

        res.status(201).json({
            success: true,
            message: 'Form submitted successfully!',
            data: saved
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ─── Get All Admissions ─────────────────────
export const getAllAdmissions = async (req, res) => {
    try {
        let query = {};

        // ✅ If counsellor → only assigned students
        if (req.user.role === "counslor") {
            query.assignedCounsellor = req.user.id;
        }

        // ✅ If receptionist/admin → see all
        // (no filter)

        const admissions = await Admission.find(query)
            .populate("assignedCounsellor", "name")
            .sort({ submittedAt: -1 });

        res.json({
            success: true,
            data: admissions,
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ─── Get Single ─────────────────────────────
export const getAdmission = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id)
            .populate('assignedCounsellor', 'name email')
            .populate('checkedInBy', 'name')
            .populate('counsellingNotes.counsellor', 'name email')

        if (!admission) {
            return res.status(404).json({ message: 'Not found' });
        }

        res.json({ success: true, data: admission });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ─── Check-In ───────────────────────────────
export const checkIn = async (req, res) => {
    try {
        const { counsellorId } = req.body;

        const admission = await Admission.findByIdAndUpdate(
            req.params.id,
            {
                status: 'In Counselling',
                checkedInAt: new Date(),
                checkedInBy: req.user.id,
                ...(counsellorId && { assignedCounsellor: counsellorId })
            },
            { new: true }
        ).populate('assignedCounsellor', 'name');

        res.json({ success: true, data: admission });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ─── Update Student ─────────────────────────
export const updateStudent = async (req, res) => {
    try {
        const admission = await Admission.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.json({ success: true, data: admission });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ─── Counsel ───────────────────────────────
export const counsel = async (req, res) => {
    try {
        const { note, outcome } = req.body;

        const admission = await Admission.findById(req.params.id);

        admission.counsellingNotes.push({
            counsellor: req.user.id,        // ✅ ObjectId
            counsellorName: req.user.name,  // ✅ Auto name
            note,
            outcome,
            createdAt: new Date()
        });

        // Status logic
        if (outcome === 'Admitted') admission.status = 'Admitted';
        else if (outcome === 'Not Interested') admission.status = 'Not Interested';
        else admission.status = 'Counselled';

        await admission.save();

        res.json({ success: true, data: admission });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// ─── Stats ─────────────────────────────────
export const getStats = async (req, res) => {
    try {
        const total = await Admission.countDocuments();

        const byStatus = await Admission.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayCount = await Admission.countDocuments({
            submittedAt: { $gte: today }
        });

        res.json({ total, byStatus, todayCount });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



// POST /api/counsling/assign/:id/
export const assignCounsellor = async (req, res) => {
    try {
        const { counsellorId } = req.body;

        const admission = await Admission.findByIdAndUpdate(
            req.params.id,
            {
                assignedCounsellor: counsellorId,
                status: "Waiting",
            },
            { new: true }
        ).populate("assignedCounsellor", "name");


        res.json({ success: true, data: admission });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

