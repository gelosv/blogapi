import { Router } from "express";
import { getCommentsPost, getPostById, getPosts } from "./posts.controller";
import { PostService } from './posts.service';
import { Post } from "./interfaces/post-create.interface";
import { validatorSchema } from "./../middleware/validator.middle";
import { createPostSchema, paginationDto, paginationPostSchema } from "./schemas/post.validator";

const service = new PostService();
export const router = Router();

router.post('/', validatorSchema<unknown, Post>('body', createPostSchema), async (req, res, next) => {
  try {
    const userId = 1; //req.user.id
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

router.get('/comments/:postId', getCommentsPost)

router.get('/', validatorSchema<paginationDto, unknown>('query', paginationPostSchema), getPosts)

router.get('/:id', getPostById)
