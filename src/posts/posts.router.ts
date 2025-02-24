import { Router } from "express";
import { getPostById, getPosts } from "./posts.controller";
import { PostService } from './posts.service';
import { Post } from "./interfaces/post-create.interface";

const service = new PostService();
export const router = Router();

router.post('/', async (req, res, next) => {
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

router.get('/', getPosts)

router.get('/:id', getPostById)
