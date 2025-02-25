import { Router } from "express";
import { createComment, getLikedPosts, likePost } from "./user.controller";

export const router = Router();

router.post('/like/:postId', likePost)

router.post('/comment', createComment)

router.get('/like/posts', getLikedPosts)
