import mongoose from 'mongoose';

const AcademicDetailSchema = new mongoose.Schema({
  examination: String,
  schoolOrCollegeName: String,
  boardOrUniversity: String,
  yearOfPassing: String,
  aggregatePercentageCGPA: String,
  pcmPercentage: String,
  subjects: String,
});

const AdmissionSchema = new mongoose.Schema({
  // Personal Details
  fullName: { type: String, required: true, trim: true },
  program: { type: String, trim: true },
  branch: { type: String, trim: true },
  fatherName: { type: String, trim: true },
  motherName: { type: String, trim: true },
  dateOfBirth: { type: Date },
  age: { type: Number },
  studentContactNo: { type: String, trim: true },
  fatherContactNo: { type: String, trim: true },
  alternateContact: { type: String, trim: true },
  emailId: { type: String, trim: true, lowercase: true },
  aadhaarNumber: { type: String, trim: true },
  permanentAddress: { type: String, trim: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },

  // Entrance Exam
  entranceExamsGiven: [{ type: String }], // CET, CUET, NIMCET, JEE MAINS, GATE, CMAT-2026, CAT-2025
  entranceScore: { type: String },
  rankDetails: { type: String },

  // Category
  category: { type: String, enum: ['General', 'SC', 'ST', 'OBC', 'EWS', 'Jain'] },
  nationality: { type: String, trim: true },

  // Academic Details
  academicDetails: [AcademicDetailSchema],

  // Courses Interested In
  coursesInterested: [{ type: String }],

  // Source of Information
  sourceOfInformation: [{ type: String }], // Website, Newspaper, Seminar, Friends, Social Media, Others
  sourceOther: { type: String },

  // College Selection Factors
  collegeChoiceFactors: [{ type: String }],

  // Meta
  submittedAt: { type: Date, default: Date.now },
  academicSession: { type: String, default: '2026-27' },
});

const Admission = mongoose.model('Admission', AdmissionSchema);
export default Admission;