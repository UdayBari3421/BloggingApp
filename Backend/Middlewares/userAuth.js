import jwt from "jsonwebtoken";
const { TokenExpiredError } = jwt;
import Token from "../Models/Token.model.js";

const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;

    const tokenInstance = await Token.findOne({ userId: decoded.id, token });
    if (!tokenInstance) {
      return res.status(401).json({ success: false, message: "Invalid user! please login again" });
    }
  } catch (error) {
    console.log(error);
    if (error instanceof TokenExpiredError) {
      console.log("Token Expired");
    }
    return res.status(401).json({ success: false, message: "Login Expired! Please login again" });
  }
  next();
};

export default authUser;
