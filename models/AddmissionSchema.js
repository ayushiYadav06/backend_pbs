import mongoose from 'mongoose';

const admissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fathersName: {
    type: String,
    required: true
  },
  mothersName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  yearOf10thPassout: {
    type: Number,
    required: true
  },
  aadharNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,

    required: true
  },
  state: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  cityOrVillage: {
    type: String,
    required: true
  },
  pin: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  bloodGroup: {
    type: String,
    required: true
  },
  courseTaken: {
    type: String,
    required: true
  },
  branchName: {
    type: String,
    required: true
  },
  busService: {
    type: Boolean,
    default: false
  },
  hostelService: {
    type: Boolean,
    default: false
  },
  // admissionDocument: { type: String }
}, { timestamps: true });

const Admission = mongoose.model('Admission', admissionSchema);

export default Admission;
