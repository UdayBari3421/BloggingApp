import Blog from "../Models/Blog.model.js";
import User from "../Models/User.model.js";
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

export const getAllBlogs = async (req, res) => {
  console.log(req.body);
  try {
    const blogs = await Blog.find({}, "title content genre userId createdAt");
    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found", success: false });
    }

    const uniqueUserIds = [...new Set(blogs.map((blog) => blog.userId))];
    const users = await User.find({ _id: { $in: uniqueUserIds } }, "name");
    const userMap = Object.fromEntries(users.map((user) => [user._id.toString(), user.name]));

    const blogResponse = blogs.map((blog) => ({
      blogId: blog._id,
      timestamp: blog.createdAt,
      title: blog.title,
      content: blog.content,
      genre: blog.genre,
      authorName: userMap[blog.userId] || "Unknown",
    }));

    return res.status(200).json({ message: "Blogs fetched successfully", success: true, blogs: blogResponse });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};
