import { Request, RequestHandler, Response } from "express";
import { PostService } from './posts.service';
import { PaginationDto, postIdDto } from "./schemas/post.validator";
import { catchAsync } from "../common/catchAsync";
const service = new PostService();
//
export const getPosts: RequestHandler<unknown, unknown, unknown, PaginationDto> = catchAsync(async (req, res) => {
  const pagination = req.query;
  console.log(pagination, 'page')
  const posts = await service.getPosts(pagination);
  res.json(posts);
})

export const getPostById: RequestHandler<postIdDto, unknown, unknown, unknown> = catchAsync(async (req, res) => {
  const postId = req.params.id
  const post = await service.getPostById(postId);
  res.json(post);
})

export const getCommentsPost = catchAsync(async (req: Request, res: Response) => {
  const postId = +req.params.id
  console.log(postId, 'rotuer')
  const comments = await service.getCommentsPost(postId);
  res.json(comments);
})
