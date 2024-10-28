import asyncHandler from 'express-async-handler';
import Admission from '../models/AddmissionSchema.js';

// @desc    Register a new admission
// @route   POST /api/admissions
// @access  Public
const registerAdmission = asyncHandler(async (req, res) => {
  const { name, email, fathersName, mothersName, mobileNumber, yearOf10thPassout, aadharNumber, address, state, country, cityOrVillage, pin, gender, dob, bloodGroup, courseTaken, branchName, busService, hostelService } = req.body;

  // Validate required fields
  if (!name || !email || !fathersName || !mothersName || !mobileNumber || !yearOf10thPassout || !aadharNumber || !address || !state || !country || !cityOrVillage || !pin || !gender || !dob || !bloodGroup || !courseTaken || !branchName) {
    res.status(400);
    throw new Error('All fields are required');
  }

  // Check if the email or aadhar number already exists
  const emailExists = await Admission.findOne({ email });
  const aadharExists = await Admission.findOne({ aadharNumber });

  if (emailExists) {
    res.status(400);
    throw new Error('Email already exists');
  }

  if (aadharExists) {
    res.status(400);
    throw new Error('Aadhar number already exists');
  }

  // Create a new admission entry
  const admission = await Admission.create({
    name,
    email,
    fathersName,
    mothersName,
    mobileNumber,
    yearOf10thPassout,
    aadharNumber,
    address,
    state,
    country,
    cityOrVillage,
    pin,
    gender,
    dob,
    bloodGroup,
    courseTaken,
    branchName,
    busService,
    hostelService,
  });

  if (admission) {
    res.status(201).json({
      status: true,
      message: 'Admission registered successfully',
      data: admission,
    });
  } else {
    res.status(400);
    throw new Error('Admission registration failed');
  }
});

// @desc    Get all admissions
// @route   GET /api/admissions
// @access  Public
const getAdmissions = asyncHandler(async (req, res) => {
  const admissions = await Admission.find({});
  res.json({ status: true, data: admissions });
});

// @desc    Get admission by ID
// @route   GET /api/admissions/:id
// @access  Public
const getAdmissionById = asyncHandler(async (req, res) => {
  const admission = await Admission.findById(req.params.id);

  if (admission) {
    res.json({ status: true, data: admission });
  } else {
    res.status(404);
    throw new Error('Admission not found');
  }
});

// @desc    Update an admission
// @route   PUT /api/admissions/:id
// @access  Public
const updateAdmission = asyncHandler(async (req, res) => {
  const admission = await Admission.findById(req.params.id);

  if (admission) {
    admission.name = req.body.name || admission.name;
    admission.email = req.body.email || admission.email;
    admission.fathersName = req.body.fathersName || admission.fathersName;
    admission.mothersName = req.body.mothersName || admission.mothersName;
    admission.mobileNumber = req.body.mobileNumber || admission.mobileNumber;
    admission.yearOf10thPassout = req.body.yearOf10thPassout || admission.yearOf10thPassout;
    admission.aadharNumber = req.body.aadharNumber || admission.aadharNumber;
    admission.address = req.body.address || admission.address;
    admission.state = req.body.state || admission.state;
    admission.country = req.body.country || admission.country;
    admission.cityOrVillage = req.body.cityOrVillage || admission.cityOrVillage;
    admission.pin = req.body.pin || admission.pin;
    admission.gender = req.body.gender || admission.gender;
    admission.dob = req.body.dob || admission.dob;
    admission.bloodGroup = req.body.bloodGroup || admission.bloodGroup;
    admission.courseTaken = req.body.courseTaken || admission.courseTaken;
    admission.branchName = req.body.branchName || admission.branchName;
    admission.busService = req.body.busService || admission.busService;
    admission.hostelService = req.body.hostelService || admission.hostelService;

    const updatedAdmission = await admission.save();

    res.json({
      status: true,
      message: 'Admission updated successfully',
      data: updatedAdmission,
    });
  } else {
    res.status(404);
    throw new Error('Admission not found');
  }
});

// @desc    Delete an admission
// @route   DELETE /api/admissions/:id
// @access  Public
const deleteAdmission = asyncHandler(async (req, res) => {
  const admission = await Admission.findById(req.params.id);

  if (admission) {
    // Use the model's deleteOne method to remove the admission
    await Admission.deleteOne({ _id: req.params.id });
    res.json({ status: true, message: 'Admission removed' });
  } else {
    res.status(404);
    throw new Error('Admission not found');
  }
});


export { registerAdmission, getAdmissions, getAdmissionById, updateAdmission, deleteAdmission };
