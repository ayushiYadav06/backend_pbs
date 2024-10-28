import mongoose from 'mongoose';
import validator from 'validator';

const admissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name can't exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Please provide a valid email address"
    }
  },
  fathersName: {
    type: String,
    required: [true, "Father's name is required"],
    minlength: [3, "Father's name must be at least 3 characters long"],
    maxlength: [50, "Father's name can't exceed 50 characters"]
  },
  mothersName: {
    type: String,
    required: [true, "Mother's name is required"],
    minlength: [3, "Mother's name must be at least 3 characters long"],
    maxlength: [50, "Mother's name can't exceed 50 characters"]
  },
  mobileNumber: {
    type: String,
    required: [true, "Mobile number is required"],
    validate: {
      validator: (value) => validator.isMobilePhone(value, 'en-IN'),  // Example for Indian numbers
      message: "Please provide a valid mobile number"
    }
  },
  yearOf10thPassout: {
    type: Number,
    required: [true, "Year of 10th passout is required"],
    min: [1900, "Year cannot be less than 1900"],
    max: [new Date().getFullYear(), "Year cannot be in the future"]
  },
  aadharNumber: {
    type: String,
    required: [true, "Aadhar number is required"],
    validate: {
      validator: (value) => validator.isLength(value, { min: 12, max: 12 }),
      message: "Please provide a valid 12-digit Aadhar number"
    }
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    maxlength: [200, "Address cannot exceed 200 characters"]
  },
  state: {
    type: String,
    required: [true, "State is required"]
  },
  country: {
    type: String,
    required: [true, "Country is required"]
  },
  cityOrVillage: {
    type: String,
    required: [true, "City or village is required"]
  },
  pin: {
    type: String,
    required: [true, "PIN code is required"],
    validate: {
      validator: (value) => validator.isPostalCode(value, 'IN'),  // Example for Indian PIN codes
      message: "Please provide a valid 6-digit PIN code"
    }
  },
  gender: {
    type: String,
    required: [true, "Gender is required"],
    enum: ['Male', 'Female', 'Other']
  },
  dob: {
    type: Date,
    required: [true, "Date of birth is required"],
    validate: {
      validator: (value) => value < new Date(),
      message: "Date of birth must be in the past"
    }
  },
  bloodGroup: {
    type: String,
    required: [true, "Blood group is required"],
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    message: "Please provide a valid blood group"
  },
  courseTaken: {
    type: String,
    required: [true, "Course taken is required"]
  },
  branchName: {
    type: String,
    required: [true, "Branch name is required"]
  },
  busService: {
    type: Boolean,
    default: false
  },
  hostelService: {
    type: Boolean,
    default: false
  },
  isStudent: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

const Admission = mongoose.model('Admission', admissionSchema);

export default Admission;
