import express from "express";
import cors from "cors";
import "dotenv/config.js";
import blogRouter from "./routes/blogRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import genreRouter from "./routes/genreRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { connectDb } from "./config/connection.js";
connectDb();

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comment", commentRouter);
app.use("/api/genre", genreRouter);

app.get("/", (_, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on ---> http://localhost:${process.env.PORT || 4000}`);
});
