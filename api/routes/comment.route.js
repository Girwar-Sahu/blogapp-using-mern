import express from "express";
import {
  CreateComment,
  getComment,
  getComments,
  likeComment,
  editComment,
  deleteComment,
} from "../controllers/comment.controller.js";
import { varifyToken } from "../utils/varifyUser.js";
const router = express.Router();

router.post("/create", varifyToken, CreateComment);
router.get("/getcomments/:postId", getComments);
router.get("/getcomment", varifyToken, getComment);
router.put("/like/:commentId", varifyToken, likeComment);
router.put("/edit/:commentId", varifyToken, editComment);
router.delete("/delete/:commentId", varifyToken, deleteComment);
export default router;
