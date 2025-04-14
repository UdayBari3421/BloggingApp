import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { createToken, stroreToken } from "../utils/token.js";
import { validateAdminData, validateAdminLogin } from "../utils/adminValidation.js";
import Token from "../models/tokenModel.js";

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    validateAdminLogin(username, password);

    const admin = await Admin.findOne({ $or: [{ username }, { email: username }] });
    if (!admin)
      return res.status(400).json({
        success: false,
        message: "Admin does not exist with this username or email",
      });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid username or password" });

    const token = createToken(admin._id);
    await stroreToken(admin, token, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const addAdmin = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    validateAdminData(name, username, email, password);

    const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists with this username or email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      username,
      email,
      password: hashedPassword,
    });

    if (!newAdmin) {
      return res.status(400).json({
        success: false,
        message: "Failed to create admin",
      });
    }

    await newAdmin.save();

    const token = createToken(newAdmin._id);
    await stroreToken(newAdmin, token, res);

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      user: newAdmin,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const adminLogout = async (req, res) => {
  try {
    const { userId } = req.body;
    await Token.findOneAndDelete({ userId });
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteAdmin = async (req, res) => {};

export const getAllAdmins = async (req, res) => {};
