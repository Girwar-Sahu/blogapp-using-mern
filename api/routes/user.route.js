import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { varifyToken } from "../utils/varifyUser.js";
const router = express.Router();

router.put("/update/:userId", varifyToken, updateUser);
router.delete("/delete/:userId", varifyToken, deleteUser);
export default router;
