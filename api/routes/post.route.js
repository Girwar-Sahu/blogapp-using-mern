import express from "express";
import { varifyToken } from "../utils/varifyUser.js";
import {
  createPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", varifyToken, createPost);
router.get("/getposts", getPosts);
router.get("/getpost/:postId", getPost);
router.delete("/delete/:postId/:userId", varifyToken, deletePost);
router.put("/update/:postId/:userId", varifyToken, updatePost);
export default router;
