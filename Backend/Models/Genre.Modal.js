import mongoose, { Schema } from "mongoose";

const GenreSchema = new Schema(
  {
    genre: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Genre = mongoose.model("Genre", GenreSchema);
export default Genre;
