import asyncHandler from 'express-async-handler';
import Admission from '../models/AddmissionSchema.js';
import Teacher from '../models/TeacherSchema.js';
import User from '../models/UserSchema.js'; // Import the User model
import bcrypt from 'bcryptjs'; // For password hashing
import nodemailer from 'nodemailer';

// Other existing functions...

// @desc    Confirm admission and create user
// @route   POST /api/admissions/:id/confirm
// @access  Admin
export const confirmAdmission = asyncHandler(async (req, res) => {
  const admission = await Admission.findById(req.params.id);

  if (!admission) {
    res.status(404);
    throw new Error('Admission not found');
  }

  // Check if required fields exist
  const { name, email, mobileNumber } = admission;
  if (!name || !email || !mobileNumber) {
    res.status(400);
    throw new Error('All fields are required');
  }

  // Generate a password
  const password = Math.random().toString(36).slice(-8); // Simple random password

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  // Create the user in the User collection
  const user = await User.create({
    name,
    email,
    mobileNumber,
    password: bcrypt.hashSync(password, 10), // Hash the password
    isStudent: true,
  });

  // Send email with login details
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Admission Confirmation',
    text: `Dear ${name},\n\nCongratulations! You have been admitted. Your login details are:\nEmail: ${email}\nPassword: ${password}\n\nBest Regards,\nYour Institution`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    }
  });

  res.status(200).json({
    status: true,
    message: 'Admission confirmed and user created successfully',
    data: user,
  });
});



// Other existing functions...

// @desc    Confirm teacher registration and create user
// @route   POST /api/teachers/:id/confirm
// @access  Admin
export const registerTeacher = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id);

  if (!teacher) {
    res.status(404);
    throw new Error('Teacher not found');
  }

  // Check if required fields exist
  const { name, email, mobileNo } = teacher;
  if (!name || !email || !mobileNo) {
    res.status(400);
    throw new Error('All fields are required');
  }

  // Generate a password
  const password = Math.random().toString(36).slice(-8); // Simple random password

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error('User with this email already exists');
  }

  // Create the user in the User collection
  const user = await User.create({
    name,
    email,
    mobileNo,
    password: bcrypt.hashSync(password, 10), // Hash the password
    isTeacher: true,
  });

  // Send email with login details
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Teacher Registration Confirmation',
    text: `Dear ${name},\n\nCongratulations! You have been registered as a teacher. Your login details are:\nEmail: ${email}\nPassword: ${password}\n\nBest Regards,\nYour Institution`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    }
  });

  res.status(200).json({
    status: true,
    message: 'Teacher confirmed and user created successfully',
    data: user,
  });
});


// @desc    Register a new admin
// @route   POST /api/admins/register
// @access  Public
export const registerAdmin = asyncHandler(async (req, res) => {
  
  const { name, email, mobileNo, password } = req.body; // Receive password

  // Check for required fields
  if (!name || !email || !mobileNo || !password) { // Check for password
      res.status(400);
      throw new Error('All fields are required');
  }

  // Check if admin already exists
  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) {
      res.status(400);
      throw new Error('Admin with this email already exists');
  }

  // Create the admin in the Admin collection
  const admin = await User.create({
      name,
      email,
      mobileNo,
      password: bcrypt.hashSync(password, 10), // Hash the password
      role: 'admin' // Add the role field
  });

  // Send email with login details
  const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
      },
  });

  const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Admin Registration Confirmation',
      text: `Dear ${name},\n\nCongratulations! You have been registered as an admin. Your login details are:\nEmail: ${email}\nPassword: ${password}\n\nBest Regards,\nYour Institution`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
      }
  });

  res.status(201).json({
      status: true,
      message: 'Admin registered successfully',
      data: admin,
  });
});




// @desc    Login User (Student/Teacher/Admin)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = asyncHandler(async (req, res) => {
  const { emailOrMobile, password } = req.body;

  // Check if both fields are provided
  if (!emailOrMobile || !password) {
    res.status(400);
    throw new Error('Email/Mobile number and password are required');
  }

  // Find user by email or mobile number
  const user = await User.findOne({
    $or: [{ email: emailOrMobile }, { mobileNumber: emailOrMobile }],
  });

  // Check if user exists and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    // Generate access and refresh tokens
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role }, // You can add role to the payload (admin, teacher, student)
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES } // e.g., '10h'
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES } // e.g., '30d'
    );

    // Return the tokens and user info
    res.status(200).json({
      status: true,
      message: 'Login successful',
      accessToken,
      refreshToken,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role, // role: 'student', 'teacher', 'admin'
      },
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
export const refreshToken = asyncHandler(async (req, res) => {
  const { token } = req.body;

  // Validate the refresh token
  if (!token) {
    res.status(400);
    throw new Error('Refresh token is required');
  }

  try {
    // Verify the refresh token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { userId: userId },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES }
    );

    res.status(200).json({
      status: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(401);
    throw new Error('Invalid refresh token');
  }
});

