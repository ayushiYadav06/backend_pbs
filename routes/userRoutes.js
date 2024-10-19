import express from "express";
import {
  loginController,
  registerStudent,
  authController,
} from "../controllers/userControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";
import users from "../models/UserSchema.js";

const router = express.Router();


router.post("/register", registerStudent);


router.post("/login", loginController);

router.post("/getUserData", authMiddleware, authController);


router.get("/", async (req, res) => {
  try {
    const usersList = await users.find(); 
    res.status(200).json(usersList);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send({ message: "Error fetching users", success: false });
  }
});


router.use((req, res) => {
  res.status(404).send({ message: "Route not found" });
});

export default router;
