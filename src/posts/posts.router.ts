import { Router } from "express";
import { getPostById, getPosts } from "./posts.controller";
import { PostService } from './posts.service';

const service = new PostService();
export const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const post = await service.createPost(req.body);
    res.json(post);
  } catch (error) {
    next(error)
  }
})

router.get('/', getPosts)

router.get('/:id', getPostById)
