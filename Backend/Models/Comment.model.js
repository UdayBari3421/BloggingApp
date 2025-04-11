import mongoose, { Schema } from "mongoose";

export const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  parentId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.models || mongoose.model("Comment", commentSchema);

export default Comment;
