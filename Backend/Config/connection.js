import mongoose from "mongoose";

let retries = Number(process.env.DB_RETRIES);

export const connectDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    retries++;
    await mongoose.connect(process.env.DEV_MONGO_URI || `${process.env.PROD_MONGO_URI}/blogApp`);
  } catch (error) {
    console.log(`Failed to connect to MongoDB: ${error}`);
    if (retries < Number(process.env.DB_RETRIES)) {
      console.log(`Retrying to connect to MongoDB: ${retries}`);
      setTimeout(connectDb, 5000);
    }
  }
};
