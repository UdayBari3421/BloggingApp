import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });

    await mongoose.connect(process.env.DEV_MONGO_URI);
  } catch (error) {}
};
