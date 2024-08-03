import express from "express";
import { varifyToken } from "../utils/varifyUser.js";
import { createPost, getPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", varifyToken, createPost);
router.get("/getposts", getPost);
export default router;
