const adminAuth = (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD ||
      email === process.env.ADMIN_EMAIL
    ) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    req.isAdmin = true;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export default adminAuth;
