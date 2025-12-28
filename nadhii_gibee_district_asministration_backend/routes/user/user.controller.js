// controllers/usersController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import userSchema from "./user.schema.js";
import { db, schema } from "../../config/db.js";
import { eq } from "drizzle-orm";
import generateOTP from "../../utils/generateor.js";
import { sendEmail } from "../../utils/emailSender.js";

const usersController = {
  // CREATE - Register new user
  register: async (req, res) => {
    try {
      const validatedData = userSchema.register.parse(req.body);

      // Check if user exists
      const [existingUser] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, validatedData.email))
        .limit(1);

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email is already in use.",
        });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(validatedData.password, salt);

      // Create new user
      const [result] = await db.insert(schema.users).values({
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        password: hashedPassword,
        role: validatedData.role || "user",
      });

      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          id: Number(result.insertId),
          firstName: validatedData.firstName,
          lastName: validatedData.lastName,
          email: validatedData.email,
          role: validatedData.role || "user",
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
      console.error("Registration error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  // READ - Get all users
  getUsers: async (req, res) => {
    try {
      const users = await db
        .select({
          id: schema.users.id,
          firstName: schema.users.firstName,
          lastName: schema.users.lastName,
          email: schema.users.email,
          role: schema.users.role,
          createdAt: schema.users.createdAt,
          updatedAt: schema.users.updatedAt,
        })
        .from(schema.users);

      return res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error) {
      console.error("Get users error:", error);
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

      const [user] = await db
        .select({
          id: schema.users.id,
          firstName: schema.users.firstName,
          lastName: schema.users.lastName,
          email: schema.users.email,
          role: schema.users.role,
          createdAt: schema.users.createdAt,
          updatedAt: schema.users.updatedAt,
        })
        .from(schema.users)
        .where(eq(schema.users.id, parseInt(userId)));

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      console.error("Get user error:", error);
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

      // Update user
      await db
        .update(schema.users)
        .set({
          ...updateData,
          updatedAt: new Date(),
        })
        .where(eq(schema.users.id, parseInt(validatedData.userId)));

      // Get updated user
      const [updatedUser] = await db
        .select({
          id: schema.users.id,
          firstName: schema.users.firstName,
          lastName: schema.users.lastName,
          email: schema.users.email,
          role: schema.users.role,
          createdAt: schema.users.createdAt,
          updatedAt: schema.users.updatedAt,
        })
        .from(schema.users)
        .where(eq(schema.users.id, parseInt(validatedData.userId)));

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      if (error.name === "ZodError") {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      console.error("Error updating user:", error);
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
      const userId = parseInt(validatedData.userId);

      // Check if user exists
      const [user] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, userId));

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Delete user
      await db.delete(schema.users).where(eq(schema.users.id, userId));

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
      console.error("Error deleting user:", error);
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

      const [user] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, validatedData.email))
        .limit(1);

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
        id: user.id,
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
          id: user.id,
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
      console.error("Login error:", error);
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

      const [user] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.email, validatedData.email))
        .limit(1);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const otp = generateOTP();

      // Update OTP in database
      await db
        .update(schema.users)
        .set({ otp, updatedAt: new Date() })
        .where(eq(schema.users.email, user.email));

      const emailDelivered = await sendEmail(user.email, `Your OTP: ${otp}`);

      if (!emailDelivered.success) {
        return res.status(500).json({
          success: false,
          message: `Unable to send email: ${emailDelivered.message}`,
        });
      }

      const payload = {
        id: user.id,
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
      console.error("Forgot password error:", error);
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

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.id;

      const [user] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, id))
        .limit(1);

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

      // Clear OTP after confirmation
      await db
        .update(schema.users)
        .set({ otp: null, updatedAt: new Date() })
        .where(eq(schema.users.id, id));

      const payload = {
        id: user.id,
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
      console.error("Confirm OTP error:", error);
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

      // Decode token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.id;

      if (password !== cpassword) {
        return res.status(400).json({
          success: false,
          message: "Password and confirm password do not match",
        });
      }

      const [user] = await db
        .select()
        .from(schema.users)
        .where(eq(schema.users.id, id))
        .limit(1);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "No account found with this ID",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Update password
      await db
        .update(schema.users)
        .set({
          password: hashedPassword,
          otp: null,
          updatedAt: new Date(),
        })
        .where(eq(schema.users.id, id));

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
      console.error("New password error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  },
};

export default usersController;
