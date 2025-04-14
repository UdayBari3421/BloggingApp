import validator from "validator";

export const validateAdminData = (name, username, email, password) => {
  if (!name) throw new Error("Name is required");
  if (!username) throw new Error("Username is required");
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");

  const isEmailValid = Boolean(validator.isEmail(email));
  const isPasswordValid = Boolean(validator.isStrongPassword(password));
  const isNameAndUserNameValid = Boolean(
    validator.isLength(name, { min: 3, max: 20 }) &&
      validator.isLength(username, { min: 3, max: 20 })
  );

  if (!isEmailValid) throw new Error("Invalid email format");
  if (!isPasswordValid) throw new Error("Password must be strong");
  if (!isNameAndUserNameValid)
    throw new Error("Name and username must be between 3 and 20 characters long");

  if (isEmailValid && isPasswordValid && isNameAndUserNameValid) {
    return true;
  } else {
    throw new Error("Validation failed");
  }
};

export const validateAdminLogin = (username, password) => {
  if (!username) throw new Error("Username is required");
  if (!password) throw new Error("Password is required");

  const isUsernameValid = Boolean(
    validator.isLength(username, { min: 3, max: 20 }) || validator.isEmail(username)
  );
  const isPasswordValid = Boolean(validator.isStrongPassword(password));

  if (!isUsernameValid) throw new Error("Invalid username format");
  if (!isPasswordValid) throw new Error("Password must be strong");

  if (isUsernameValid && isPasswordValid) {
    return true;
  } else {
    throw new Error("Validation failed");
  }
};
