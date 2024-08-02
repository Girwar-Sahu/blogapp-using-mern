import express from "express";
import { varifyToken } from "../utils/varifyUser.js";
import { createPost } from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", varifyToken, createPost);

export default router;
