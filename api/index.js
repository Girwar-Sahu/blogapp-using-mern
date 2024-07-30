import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

dotenv.config();

const app = express();
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.listen(5000, () => {
  connect();
  console.log(`server running on port 5000`);
});
