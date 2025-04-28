import User from "../models/userModel.js";
import Comment from "../models/commentModel.js";

export const addComment = async (req, res) => {
  const { userId, comment, parentId } = req.body;

  if (!userId) {
    return res.status(400).json({
      message: "Invalid User, please login again",
      success: false,
    });
  }

  if (!parentId) {
    return res.status(400).json({ message: "Parent Id is required", success: false });
  }

  if (!comment?.trim()) {
    return res.status(400).json({ message: "Comment cannot be empty", success: false });
  }

  try {
    const user = await User.findOne({ _id: userId }, { name: true, _id: true, gender: true });

    const newCommentInstance = new Comment({
      userId,
      comment,
      parentId,
      authorName: user.name,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const newComment = await newCommentInstance.save();

    if (!newComment) {
      return res.status(400).json({ message: "Failed to add comment", success: false });
    }

    return res.status(201).json({
      message: "Comment added successfully",
      data: { ...newComment.toObject() },
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

export const getAllComments = async (req, res) => {
  const { parentId } = req.query;

  if (!parentId) {
    return res.status(400).json({
      message: "Parent Id is required",
      success: false,
    });
  }

  try {
    const comments = await Comment.find({ parentId }).sort({ createdAt: -1 }).populate("userId");

    const total = await Comment.countDocuments({ parentId });

    if (!comments.length) {
      return res.status(404).json({
        message: "No comments found",
        success: false,
        comments: [],
      });
    }

    const formattedComments = comments.map((item) => {
      return {
        _id: item._id,
        userId: item.userId._id,
        authorName: item.authorName,
        comment: item.comment,
        parentId: item.parentId,
        createdAt: item.createdAt,
      };
    });

    return res.status(200).json({
      message: "Comments fetched successfully",
      success: true,
      comments: formattedComments,
      total,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  const { commentId, userId } = req.body;
  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found", success: false });
    }
    if (comment.userId.toString() !== userId) {
      return res
        .status(401)
        .json({ message: "You are not authorized to delete this comment", success: false });
    }

    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(400).json({ message: "Failed to delete comment", success: false });
    }

    return res.status(200).json({ message: "Comment deleted successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", success: false, error: error });
  }
};

export const getCommentCount = async (req, res) => {
  const { parentId } = req.query;

  if (!parentId) {
    return res.status(400).json({
      message: "Parent Id is required",
      success: false,
    });
  }

  try {
    const count = await Comment.countDocuments({ parentId });

    return res.status(200).json({
      message: "Comment count fetched successfully",
      success: true,
      count,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", success: false, error: error.message });
  }
};
