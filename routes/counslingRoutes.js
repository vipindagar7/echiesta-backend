
import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { checkIn, counsel, getAdmission, getAllAdmissions, getStats, updateStudent } from "../controllers/counslorController.js";

const router = express.Router();

router.get('/stats', protect, authorizeRoles('admin', 'counslor', 'receptionist'), getStats);
router.get('/', protect, authorizeRoles('admin', 'counslor', 'receptionist'), getAllAdmissions);
router.get('/:id', protect, authorizeRoles('admin', 'counslor', 'receptionist'), getAdmission);
router.post('/check-in/:id', protect, authorizeRoles('admin', 'receptionist'), checkIn);
router.put('/update-student/:id', protect, authorizeRoles('admin', 'counslor', 'receptionist'), updateStudent);

router.post('/counsel/:id', protect, authorizeRoles('admin', 'counslor'), counsel);



export default router;
