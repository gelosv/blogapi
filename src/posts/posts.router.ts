import { Request, RequestHandler, Router } from "express";
import { PostService } from './posts.service';
import { Pagination } from "./dto/pagination.interface";

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

const getPosts: RequestHandler<unknown, unknown, unknown, Pagination> = async (req, res, next) => {
  try {
    const pagination = req.query;
    console.log(pagination, 'page')
    const posts = await service.getPosts(pagination);
    res.json(posts);
  } catch (error) {
    next(error)
  }
}

router.get('/', getPosts)
