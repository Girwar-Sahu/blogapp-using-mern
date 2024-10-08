import express from "express";
import {
  updateUser,
  deleteUser,
  getUsers,
  getUser,
} from "../controllers/user.controller.js";
import { varifyToken } from "../utils/varifyUser.js";
const router = express.Router();

router.put("/update/:userId", varifyToken, updateUser);
router.delete("/delete/:userId", varifyToken, deleteUser);
router.get("/getusers/:userId", varifyToken, getUsers);
router.get("/:userId", getUser);

export default router;
