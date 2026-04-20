import mongoose from 'mongoose';

// ─── Academic Details ─────────────────────────────
const AcademicDetailSchema = new mongoose.Schema({
  examination: String,
  schoolOrCollegeName: String,
  boardOrUniversity: String,
  yearOfPassing: String,
  aggregatePercentageCGPA: String,
  pcmPercentage: String,
  subjects: String,
});

// ─── Counselling Notes ────────────────────────────
const CounsellingNoteSchema = new mongoose.Schema({
  counsellor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  counsellorName: String,
  note: String,
  outcome: {
    type: String,
    enum: ['Interested', 'Admitted', 'Follow Up', 'Not Interested', 'Pending'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// ─── Main Admission Schema ────────────────────────
const AdmissionSchema = new mongoose.Schema({

  // Personal
  fullName: { type: String, required: true, trim: true },
  program: String,
  branch: String,
  fatherName: String,
  motherName: String,
  dateOfBirth: Date,
  age: Number,

  studentContactNo: String,
  fatherContactNo: String,
  alternateContact: String,

  emailId: String,
  aadhaarNumber: String,
  permanentAddress: String,

  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },

  // Entrance
  entranceExamsGiven: [String],
  entranceScore: String,
  rankDetails: String,

  // Category
  category: {
    type: String,
    enum: ['General', 'SC', 'ST', 'OBC', 'EWS', 'Jain'],
  },
  nationality: String,

  // Academic
  academicDetails: [AcademicDetailSchema],

  // Courses
  coursesInterested: [String],

  // Source
  sourceOfInformation: [String],
  sourceOther: String,

  // Factors
  collegeChoiceFactors: [String],

  // ─── COUNSELLING SYSTEM ───

  assignedCounsellor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  checkedInBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  checkedInAt: Date,

  status: {
    type: String,
    enum: [
      'Waiting',
      'In Counselling',
      'Counselled',
      'Admitted',
      'Not Interested'
    ],
    default: 'Waiting'
  },

  counsellingNotes: [CounsellingNoteSchema],

  // Meta
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  academicSession: {
    type: String,
    default: '2026-27',
  },

}, { timestamps: true });

// Indexes
AdmissionSchema.index({ status: 1 });
AdmissionSchema.index({ assignedCounsellor: 1 });
AdmissionSchema.index({ fullName: 'text', emailId: 'text' });

const Admission = mongoose.model('Admission', AdmissionSchema);
export default Admission;