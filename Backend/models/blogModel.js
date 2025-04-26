import mongoose, { Schema } from "mongoose";

const blogSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      default: "General",
    },
    sentiment: {
      type: String,
      enum: ["Positive", "Negative", "Neutral"],
      default: "Neutral",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
