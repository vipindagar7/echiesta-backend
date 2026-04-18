import express from 'express';

const router = express.Router();
const { submitForm, getAllAdmissions, getAdmission } = require('../controllers/admissionController');

router.post('/', submitForm);
router.get('/', getAllAdmissions);
router.get('/:id', getAdmission);

module.exports = router;