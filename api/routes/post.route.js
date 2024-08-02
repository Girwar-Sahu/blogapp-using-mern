import express from "express";
import { varifyToken } from "../utils/varifyUser.js";
import { createPost, getAllPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", varifyToken, createPost);
router.get("/getposts", getAllPost);
export default router;
