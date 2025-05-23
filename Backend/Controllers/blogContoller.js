import Blog from "../models/blogModel.js";
import User from "../models/userModel.js";
import validateBlog from "../utils/blogValidation.js";
import { getSentiment } from "../utils/sentiment.js";

export const createBlog = async (req, res) => {
  try {
    const { title, content, genre, userId } = req.body;

    const { success, sentiment } = await getSentiment(content);
    if (!success) {
      console.log("Failed to fetch sentiment hence adding default sentiment as Neutral");
    } else {
      console.log("Sentiment fetched successfully: ", sentiment);
    }
    const user = await User.findById(userId);

    validateBlog(req.body);

    const newBlog = new Blog({
      userId,
      title,
      content,
      genre,
      sentiment,
    });
    await newBlog.save();

    const blog = {
      blogId: newBlog._id,
      timestamp: newBlog.createdAt,
      title: newBlog.title,
      content: newBlog.content,
      genre: newBlog.genre,
      authorName: user.name,
    };

    if (!newBlog) {
      return res.status(400).json({ message: "Blog not created", success: false });
    } else {
      return res.status(201).json({ message: "Blog created successfully", blog, success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}, "title content genre userId createdAt sentiment");
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
      sentiment: blog.sentiment,
      genre: blog.genre,
      authorName: userMap[blog.userId] || "Unknown",
    }));

    return res.status(200).json({
      message: "Blogs fetched successfully",
      success: true,
      blogs: blogResponse.reverse(),
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};
