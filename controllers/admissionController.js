import Admission from '../models/admissionModel'
// Submit new admission form
exports.submitForm = async (req, res) => {
    try {
        const admission = new Admission(req.body);
        const saved = await admission.save();
        res.status(201).json({ success: true, message: 'Form submitted successfully!', data: saved });
    } catch (error) {
        console.error('Submit error:', error);
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all admissions (admin)
exports.getAllAdmissions = async (req, res) => {
    try {
        const admissions = await Admission.find().sort({ submittedAt: -1 });
        res.json({ success: true, count: admissions.length, data: admissions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get single admission
exports.getAdmission = async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.id);
        if (!admission) return res.status(404).json({ success: false, message: 'Not found' });
        res.json({ success: true, data: admission });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};