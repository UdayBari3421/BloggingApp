import Token from "../models/tokenModel.js";
import jwt from "jsonwebtoken";

export const stroreToken = async (user, token, res) => {
  try {
    const existing = await Token.findOneAndDelete({ userId: user._id });

    if (!existing) {
      await Token.create(
        new Token({
          userId: user._id,
          token,
        })
      );
    }

    if (user.gender) {
      return res.status(200).json({
        message: "Login Successful",
        success: true,
        token,
        user: {
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          email: user.email,
          _id: user._id,
          gender: user.gender,
          name: user.name,
        },
      });
    } else {
      return res.status(200).json({
        message: "Login Successful",
        success: true,
        token,
        user: {
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          email: user.email,
          _id: user._id,
          name: user.name,
        },
      });
    }
  } catch (error) {
    return res.status(200).json({ message: error.message, success: false });
  }
};

export const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1Year" });
