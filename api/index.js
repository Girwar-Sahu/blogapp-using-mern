import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import commentRoute from "./routes/comment.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
dotenv.config();

const port = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

const __dirname = path.resolve();

const app = express();
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/dist")));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("mongodb connected");
  } catch (err) {
    console.log(err);
  }
};

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  connect();
  console.log(`server running on port ${port}`);
});
