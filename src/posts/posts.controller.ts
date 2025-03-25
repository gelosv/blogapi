import { Request, RequestHandler, Response } from "express";
import { PostService } from './posts.service';
import { PaginationDto, postIdDto } from "./schemas/post.validator";
import { catchAsync } from "../common/catchAsync";
const service = new PostService();
//
export const getPosts: RequestHandler<unknown, unknown, unknown, PaginationDto> = catchAsync(async (req, res) => {
  const pagination = req.query;
  const posts = await service.getPosts(pagination);
  res.json(posts);
})

export const deletePost = catchAsync(async (req: Request, res: Response) => {
  const postId = +req.params.id
  const userId = req.user.sub ?? null
  const post = await service.deletePost(postId, userId)
  res.json(post)
})

export const getPostById: RequestHandler<postIdDto, unknown, unknown, unknown> = catchAsync(async (req, res) => {
  const postId = req.params.id
  const post = await service.getPostById(postId);
  res.json(post);
})

export const getCommentsPost = catchAsync(async (req: Request, res: Response) => {
  const postId = +req.params.id
  const comments = await service.getCommentsPost(postId);
  res.json(comments);
})

export const getPostUser = catchAsync(async (req: Request, res) => {
  const writerId = +req.params.writerId
  const posts = await service.getPostsByWriterId(writerId)
  res.json(posts)
}) 
