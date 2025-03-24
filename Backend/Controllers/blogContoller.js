import Blog from "../Models/Blog.model.js";
import validateBlog from "../Utils/blogValidation.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, genre, userId } = req.body;

    validateBlog(req.body);

    const newBlog = new Blog({
      userId,
      title,
      content,
      genre,
    });
    await newBlog.save();

    if (!newBlog) {
      return res.status(400).json({ message: "Blog not created", success: false });
    } else {
      return res.status(201).json({ message: "Blog created successfully", newBlog, success: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
