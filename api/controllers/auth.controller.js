import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
   return next(errorHandler(400, "all fields are required"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);
  
  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });

  try {
    await newUser.save();
    return res.status(200).json("signup successful");
  } catch (error) {
    next(error);
  }
};
