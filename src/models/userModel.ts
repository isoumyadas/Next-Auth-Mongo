import mongoose from "mongoose";

// You as the developer are responsible for ensuring that your document interface lines up with your Mongoose schema.
// For example, Mongoose won't report an error if email is required in your Mongoose schema but optional in your document interface.

interface IUser {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  isAdmin: boolean;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date;
  verifyToken: string;
  verifyTokenExpiry: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },

  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
  },

  isVerified: {
    type: Boolean,
    default: false,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// Check if the model "user" is already created if yes the use that if no then create it. This is usally done in Next.js
export const User =
  mongoose.models.users || mongoose.model<IUser>("users", userSchema);
