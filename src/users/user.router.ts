import { Router } from "express";
import { getLikedPosts, likePost } from "./user.controller";

export const router = Router();

router.post('/like/:postId', likePost)

router.get('/like/posts', getLikedPosts)
