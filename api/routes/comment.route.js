import express from "express";
import {
  CreateComment,
  getComments,
  likeComment,
  editComment,
} from "../controllers/comment.controller.js";
import { varifyToken } from "../utils/varifyUser.js";
const router = express.Router();

router.post("/create", varifyToken, CreateComment);
router.get("/getcomments/:postId", getComments);
router.put("/like/:commentId", varifyToken, likeComment);
router.put("/edit/:commentId", varifyToken, editComment);
export default router;
