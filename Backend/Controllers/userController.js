import bcrypt from "bcrypt";
import User from "../Models/User.model.js";
import { emailValid, passwordValid, nameValid, genderValid, createToken } from "../Utils/userValidation.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password", success: false });
    }

    const token = createToken(user._id);

    return res.status(200).json({ message: "Login Successful", success: true, data: user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const registerConroller = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;

    if (!nameValid(name)) {
      return res.status(400).json({ message: "Invalid Name", success: false });
    } else if (!emailValid(email)) {
      return res.status(400).json({ message: "Invalid Email", success: false });
    } else if (!passwordValid(password)) {
      return res.status(400).json({ message: "Invalid Password", success: false });
    } else if (!genderValid(gender)) {
      return res.status(400).json({ message: "Gender is invalid", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword, gender });
    const user = await newUser.save();

    const token = createToken(user._id);

    return res.status(200).json({ message: "User Created Successfully", success: true, data: user, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
