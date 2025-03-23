import validator from "validator";
import jwt from "jsonwebtoken";

export const emailValid = (email) => validator.isEmail(email);

export const passwordValid = (password) => validator.isStrongPassword(password);

export const nameValid = (name) => validator.isAlpha(name) && validator.isLength(name, { min: 3, max: 20 });

export const genderValid = (gender) => validator.isIn(gender, ["MALE", "FEMALE", "OTHER"]);

export const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);
