import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/UserSchema.js';

// Middleware to protect routes (requires login)
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if token is in the authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from the header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user data by ID and attach it to req.user
      req.user = await User.findById(decoded.userId).select('-password'); // Exclude password from fetched data

      next(); // Proceed to the next middleware or controller
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Middleware to check if the user is an Admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Proceed if the user is an admin
  } else {
    res.status(403);
    throw new Error('Access denied, admin only');
  }
};

// Middleware to check if the user is a Teacher
const teacher = (req, res, next) => {
  if (req.user && req.user.role === 'teacher') {
    next(); // Proceed if the user is a teacher
  } else {
    res.status(403);
    throw new Error('Access denied, teacher only');
  }
};

// Middleware to check if the user is a Student
const student = (req, res, next) => {
  if (req.user && req.user.role === 'student') {
    next(); // Proceed if the user is a student
  } else {
    res.status(403);
    throw new Error('Access denied, student only');
  }
};

export { protect, admin, teacher, student };
