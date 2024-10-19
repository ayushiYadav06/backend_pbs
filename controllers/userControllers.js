import users from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// Helper function to generate a random password
const generatePassword = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

// Helper function to generate a random mobile number
const generateMobileNumber = () => {
  const randomNum = Math.floor(1000000000 + Math.random() * 9000000000);
  return randomNum.toString();
};

 const registerStudent = async (req, res) => {
  try {
    const { name, email } = req.body; // Assuming you're sending name and email when confirming

    // Check if the student already exists by email
    const existingStudent = await users.findOne({ email });

    if (existingStudent) {
      return res.status(409).json({ message: "Student already exists", success: false });
    }

    // Generate mobile number and password
    const mobileNo = generateMobileNumber();
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the generated password

    // Create new student
    const newStudent = new users({
      username: name,
      email,
      mobileNo,
      password: hashedPassword,
      status: "confirmed", // Set status to confirmed
    });

    await newStudent.save();

    // Send response with the new mobile number and password
    res.status(201).json({
      message: "Student registered successfully",
      mobileNo,
      password,  // Send the plain password to the admin (secure this in a real app)
    });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Login Controller for Student (using email or mobile number)
 const loginController = async (req, res) => {
  try {
    const { identifier, password } = req.body;  // "identifier" can be email or mobile number

    // Check if both identifier and password are provided
    if (!identifier || !password) {
      return res.status(400).json({ message: "Email/Mobile number and password are required", success: false });
    }

    let student;

    // Check if the identifier is a valid email
    const isEmail = /^\S+@\S+\.\S+$/.test(identifier);

    if (isEmail) {
      // Find student by email
      student = await users.findOne({ email: identifier });
    } else {
      // Find student by mobile number
      student = await users.findOne({ mobileNo: identifier });
    }

    // If student is not found
    if (!student) {
      return res.status(404).json({ message: "Student not found", success: false });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email/mobile number or password", success: false });
    }

    // Generate JWT token
    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Respond with the token and user data
    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      data: {
        id: student._id,
        username: student.username,
        email: student.email,
        mobileNo: student.mobileNo,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", success: false });
  }
};


// const loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).send({ message: "Email and password are required", success: false });
//     }

//     const user = await users.findOne({ email });
//     if (!user) {
//       return res.status(404).send({ message: "User not found", success: false });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).send({ message: "Invalid email or password", success: false });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, );
//     res.status(200).send({ message: "Login successful", success: true, token, data: user });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).send({ message: `Error in Login: ${error.message}` });
//   }
// };

// Register Controller
// const registerController = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

   
//     if (!username || !email || !password) {
//       return res.status(400).send({ message: "All fields are required", success: false });
//     }

   
//     const existingUser = await users.findOne({ email });
//     if (existingUser) {
//       return res.status(409).send({ message: "User already exists", success: false });
//     }

    
//     const passwordValidation = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!passwordValidation.test(password)) {
//       return res.status(400).send({
//         message: "Password must contain at least 8 characters, one letter, one number, and one special character.",
//         success: false,
//       });
//     }


//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

  
//     const newUser = new users({ username, email, password: hashedPassword });
//     await newUser.save();

//     res.status(201).send({ message: "Registered successfully", success: true });
//   } catch (error) {
//     console.error("Registration Error:", error);
//     res.status(500).send({ success: false, message: `Registration Error: ${error.message}` });
//   }
// };


const authController = async (req, res) => {
  try {
    const user = await users.findById(req.body.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found", success: false });
    }

    user.password = undefined; 
    res.status(200).send({ success: true, data: user });
  } catch (error) {
    console.error("Auth Error:", error);
    res.status(500).send({ message: "Auth error", success: false, error });
  }
};

export {
  loginController,
  registerStudent,
  authController,
};
