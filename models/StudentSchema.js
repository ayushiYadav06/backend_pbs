import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    timestamp: {
      type: Date,
      default: Date.now, // Automatically adds the current timestamp
    },
    session: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    mobileNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    adharCardNo: {
      type: String,
      required: true,
    },
    abcId: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    enrollmentNo: {
      type: String,
      required: true,
    },
    mjc01: {
      type: String,
      required: true,
    },
    mic01: {
      type: String,
      required: true,
    },
    mdc01: {
      type: String,
      required: true,
    },
    sec01: {
      type: String,
      required: true,
    },
    vac01: {
      type: String,
      required: true,
    },
    aec01: {
      type: String,
      required: true,
    },
    mjc02: {
      type: String,
      required: true,
    },
    mic02: {
      type: String,
      required: true,
    },
    mdc02: {
      type: String,
      required: true,
    },
    sec02: {
      type: String,
      required: true,
    },
    vac02: {
      type: String,
      required: true,
    },
    aec02: {
      type: String,
      required: true,
    },
    document: {
      type: String, // Store the file path or URL of the document
    },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);
export default Student;
