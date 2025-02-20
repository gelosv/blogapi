import { Router } from "express";
import { PostService } from './posts.service';

export const router = Router();
const service = new PostService();

router.post('/', async (req, res, next) => {
  try {
    const post = await service.createPost(req.body);
    res.json(post);
  } catch (error) {
    next(error)
  }
})
