import { NextFunction, Request, RequestHandler, Response } from "express";
import { PostService } from './posts.service';
import { paginationDto, postIdDto } from "./schemas/post.validator";
const service = new PostService();
//
export const getPosts: RequestHandler<unknown, unknown, unknown, paginationDto> = async (req, res, next) => {
  try {
    const pagination = req.query;
    console.log(pagination, 'page')
    const posts = await service.getPosts(pagination);
    res.json(posts);
  } catch (error) {
    next(error)
  }
}

export const getPostById: RequestHandler<postIdDto, unknown, unknown, unknown> = async (req, res, next) => {
  try {
    const postId = req.params.id
    const post = await service.getPostById(postId);
    res.json(post);
  } catch (error) {
    next(error)
  }
}

export const getCommentsPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const postId = +req.params.postId
    console.log(postId, 'rotuer')
    const comments = await service.getCommentsPost(postId);
    res.json(comments);
  } catch (error) {
    next(error)
  }
}
