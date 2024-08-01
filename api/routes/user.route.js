import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { varifyToken } from "../utils/varifyUser.js";
const router = express.Router();

router.put("/update/:userId", varifyToken, updateUser);
export default router;
