import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import userSchema from "./user.schema.js";
import User from "../../models/User.model.js";
import generateOTP from "../../utils/generateor.js";
import { sendEmail } from "../../utils/emailSender.js";

const usersController = {
  // CREATE - Register new user
  register: async (req, res) => {
    try {
      const validatedData = userSchema.register.parse(req.body);

      const existingUser = await User.findOne({ email: validatedData.email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(validatedData.password, salt);

      const newUser = new User({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role || "user",
      });

      await newUser.save();

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          role: newUser.role,
        },
      });
    } catch (error) {
      if (error.name === "ZodError") {
        // console.log(error.errors);
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      // console.error("Registration error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // READ - Get all users
  getUsers: async (req, res) => {
    try {
      const users = await User.find()
        .select("firstName lastName email role createdAt updatedAt")
        .lean();
      const transformedUsers = users.map((user) => {
        const { _id, ...rest } = user;
        return { id: _id, ...rest };
      });

      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: transformedUsers,
      });
    } catch (error) {
      // console.error("Get users error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // READ - Get single user by ID
  getUserById: async (req, res) => {
    try {
      const { userId } = req.params;

      const user = await User.findById(userId)
        .select("firstName lastName email role createdAt updatedAt")
        .lean();

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const { _id, ...rest } = user;
      const transformedUser = { id: _id, ...rest };
      return res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: transformedUser,
      });
    } catch (error) {
      // console.error("Get user error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // UPDATE - Edit user
  updateUser: async (req, res) => {
    try {
      const validatedData = userSchema.edit.parse({
        ...req.params,
        ...req.body,
      });

      const { password, ...updateData } = validatedData;

      const updatedUser = await User.findByIdAndUpdate(
        validatedData.userId,
        { $set: updateData },
        {
          new: true,
          select: "firstName lastName email role createdAt updatedAt",
        }
      ).lean();

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      const { _id, ...rest } = updatedUser;
      const transformedUser = { id: _id, ...rest };
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: transformedUser,
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      // console.error("Error updating user:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // DELETE - Delete user
  deleteUser: async (req, res) => {
    try {
      const validatedData = userSchema.delete.parse(req.params);

      const user = await User.findById(validatedData.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      await User.findByIdAndDelete(validatedData.userId);

      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      // console.error("Error deleting user:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // Login user
  loginUser: async (req, res) => {
    try {
      const validatedData = userSchema.login.parse(req.body);

      const user = await User.findOne({ email: validatedData.email });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const isPasswordValid = await bcrypt.compare(
        validatedData.password,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid email or password",
        });
      }

      const payload = {
        id: user._id,
        role: user.role,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });

      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        token,
        data: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      // console.error("Login error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // Forgot password
  forgotPassword: async (req, res) => {
    try {
      const validatedData = userSchema.forgetPassowd.parse(req.body);

      const user = await User.findOne({ email: validatedData.email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const otp = generateOTP();

      user.otp = otp;
      await user.save();

      const emailDelivered = await sendEmail(user.email, `Your OTP: ${otp}`);

      if (!emailDelivered.success) {
        return res.status(500).json({
          success: false,
          message: `Unable to send email: ${emailDelivered.message}`,
        });
      }
      const payload = {
        id: user._id,
        role: user.role,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });

      return res.status(200).json({
        success: true,
        message: "Check your email and verify the OTP",
        data: {
          token,
        },
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      // console.error("Forgot password error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  // Confirm OTP
  confirmOtp: async (req, res) => {
    try {
      const { token, otp } = userSchema.confirmOtp.parse(req.body);

      // 🔹 Decode token from body instead of req.user
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.id;

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No account found with this ID",
        });
      }

      if (otp !== user.otp) {
        return res.status(403).json({
          success: false,
          message: "Incorrect OTP",
        });
      }

      user.otp = null;
      await user.save();

      const payload = {
        id: user._id,
        role: user.role,
        email: user.email,
      };

      const newToken = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });

      return res.status(200).json({
        success: true,
        data: { token: newToken },
        message: "OTP confirmed",
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token",
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },

  newPassword: async (req, res) => {
    try {
      const { token, password, cpassword } = userSchema.newPassword.parse(
        req.body
      );

      // 🔹 Decode token from body
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.id;

      if (password !== cpassword) {
        return res.status(400).json({
          success: false,
          message: "Password and confirm password do not match",
        });
      }

      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No account found with this ID",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      user.password = hashedPassword;
      user.otp = null;
      await user.save();

      return res.status(200).json({
        success: true,
        message: "Password updated successfully",
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      if (error.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token",
        });
      }
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },
};

export default usersController;
