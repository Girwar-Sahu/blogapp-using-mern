import express from "express";
import { CreateComment, getComments } from "../controllers/comment.controller.js";
import { varifyToken } from "../utils/varifyUser.js";
const router = express.Router();

router.post("/create", varifyToken, CreateComment);
router.get('/getcomments/:postId',getComments)
export default router;
