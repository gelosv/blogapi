import { Router } from "express";
import { getCommentsPost, getPostById, getPosts, getPostUser } from "./posts.controller";
import { PostService } from './posts.service';
import { Post } from "./interfaces/post-create.interface";
import { validatorSchema } from "./../middleware/validator.middle";
import { createPostSchema, PaginationDto, paginationPostSchema, postIdDto, postIdSchema } from "./schemas/post.validator";
import passport from "passport";
import { authorizationMiddle } from "../middleware/authorization.middle";

const service = new PostService();
export const router = Router();

router.post('/', validatorSchema<unknown, Post, unknown>('body', createPostSchema), passport.authenticate('jwt', { session: false }), authorizationMiddle('WRITER'), async (req, res, next) => {
  try {
    console.log(req.user, 'user')
    const userId = req.user.sub ?? null
    const postData: Post = {
      ...req.body,
      writerId: userId
    }
    const post = await service.createPost(postData);
    res.json(post);
  } catch (error) {
    next(error)
  }
})

router.get('/comments/:id', validatorSchema('params', postIdSchema), getCommentsPost)

router.get('/', validatorSchema<PaginationDto, unknown, unknown>('query', paginationPostSchema), getPosts)

router.get('/:id', validatorSchema<unknown, unknown, postIdDto>('params', postIdSchema), getPostById)

router.get('/user/:writerId', getPostUser)
