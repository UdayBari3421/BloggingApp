import express from "express";
import cors from "cors";
import "dotenv/config.js";
import userRouter from "./Routes/UserRoutes.js";
import { connectDb } from "./Config/connection.js";
import blogRouter from "./Routes/BlogRoutes.js";
import commentRouter from "./Routes/CommentRoutes.js";
connectDb();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comments", commentRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on ---> http://localhost:${process.env.PORT || 4000}`);
});
