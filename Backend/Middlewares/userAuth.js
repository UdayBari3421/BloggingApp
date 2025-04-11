import jwt from "jsonwebtoken";
const { TokenExpiredError } = jwt;
import Token from "../models/tokenModel.js";

const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized User. Login Again!" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;

    const tokenInstance = await Token.findOne({ userId: decoded.id, token });
    if (!tokenInstance) {
      return res.status(401).json({ success: false, message: "Invalid user! please login again" });
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(401).json({ success: false, message: "Token expired! Please login again" });
    }
    return res.status(401).json({ success: false, message: "Login Expired! Please login again" });
  }
  next();
};

export default authUser;
