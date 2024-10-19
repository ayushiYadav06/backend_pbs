import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
 
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const users = mongoose.model('users', userSchema);
export default users;