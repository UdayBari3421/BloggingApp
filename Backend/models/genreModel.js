import mongoose, { Schema } from "mongoose";

const genreSchema = new Schema(
  {
    genre: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
  },
  { timestamps: true }
);

const Genre = mongoose.model("Genre", genreSchema);

export default Genre;
