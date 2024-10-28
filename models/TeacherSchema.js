import mongoose from 'mongoose';
import validator from 'validator';

// Define a custom validator for mobile number format
const mobileValidator = (value) => {
  const mobileRegex = /^\d{10}$/; // Adjust regex as needed (e.g., for specific country formats)
  return mobileRegex.test(value);
};

// Define an array of valid blood groups
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true, // Removes whitespace from the beginning and end
  },
  guardianName: {
    type: String,
    required: [true, 'Guardian name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true, // Converts the email to lowercase
    validate: {
      validator: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
        return emailRegex.test(value);
      },
      message: 'Please provide a valid email address',
    },
  },
  mobileNo: {
    type: String,
    required: [true, 'Mobile number is required'],
    validate: {
      validator: mobileValidator,
      message: 'Mobile number must be 10 digits',
    },
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
  },
  pin: {
    type: String,
    required: [true, 'PIN code is required'],
    validate: {
      validator: (value) => {
        const pinRegex = /^\d{6}$/; // Adjust regex as needed for PIN code format
        return pinRegex.test(value);
      },
      message: 'PIN code must be 6 digits',
    },
  },
  cityOrVillage: {
    type: String,
    required: [true, 'City or Village is required'],
    trim: true,
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female', 'Other'], // Specify valid options
  },
  bloodGroup: {
    type: String,
    enum: bloodGroups, // Use the predefined array for validation
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
  },
  joiningDate: {
    type: Date,
    required: [true, 'Joining date is required'],
    validate: {
      validator: (value) => value <= new Date(), // Ensures joining date is not in the future
      message: 'Joining date cannot be in the future',
    },
  },
});

const Teacher = mongoose.model('Teacher', teacherSchema);
export default Teacher;
