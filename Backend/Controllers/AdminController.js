import Admin from "../Models/Admin.model.js";

export const addAdmin = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const admin = new Admin({ username, email, password });

    if (!admin) {
      return res.status(400).json({ message: "Admin not created", success: false });
    }

    await admin.save();
    return res.status(201).json({ message: "Admin created successfully", success: true, admin });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
