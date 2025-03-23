import express from "express";
import cors from "cors";
import "dotenv/config.js";
import userRouter from "./Routes/useraRoutes.js";
import { connectDb } from "./Config/connection.js";

connectDb();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on ---> http://localhost:${process.env.PORT || 4000}`);
});
