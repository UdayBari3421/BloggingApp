import validator from "validator";

export const emailValid = (email) => validator.isEmail(email);

export const passwordValid = (password) => validator.isStrongPassword(password);

export const nameValid = (name) => validator.isLength(name, { min: 3, max: 20 });

export const genderValid = (gender) => validator.isIn(gender, ["MALE", "FEMALE", "OTHER"]);
