import mongoose, { Schema } from "mongoose";

const TokenSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Token = mongoose.models || mongoose.model("Token", TokenSchema);

export default Token;
