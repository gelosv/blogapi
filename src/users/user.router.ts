import { Router } from "express";
import { createComment, getLikedPosts, likePost } from "./user.controller";
import passport from "passport";
import { validatorSchema } from "../middleware/validator.middle";
import { createCommentSchema } from "./validators/user.validator";
import { postIdSchema } from "../posts/schemas/post.validator";

export const router = Router();

router.use(passport.authenticate('jwt', { session: false }))

router.post('/like/:id', validatorSchema('params', postIdSchema), likePost)

router.post('/comment', validatorSchema('body', createCommentSchema), createComment)

router.get('/like/posts', getLikedPosts)
