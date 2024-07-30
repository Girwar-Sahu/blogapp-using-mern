import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import cors from "cors";

dotenv.config();

const app = express();
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("mongodb connected");
  } catch (err) {
    console.log(err);
  }
};

app.use("/api", userRoute);
app.use("/api/auth", authRoute);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "internal server error";
  // console.log(statusCode, message);
  return res.json({
    success: false,
    statusCode,
    message,
  });
  
});

app.listen(5000, () => {
  connect();
  console.log(`server running on port 5000`);
});
