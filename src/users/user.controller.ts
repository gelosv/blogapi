import { Request, Response, RequestHandler } from "express";
import { UserService } from "./user.service";
import { CommentCreateDto } from "./dto/comment-create.dto";
import { catchAsync } from "../common/catchAsync";
const service = new UserService();

export const likePost = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.sub ?? null;
  const postId = +req.params.id;

  const postLiked = await service.likePost(postId, userId);
  res.json(postLiked);
});

export const getLikedPosts = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.sub ?? null;
  const posts = await service.getLikePosts(userId);
  res.json(posts);
})

export const createComment: RequestHandler<unknown, unknown, CommentCreateDto, unknown> = catchAsync(async (req, res) => {
  const { content, postId } = req.body
  const userId = req.user.sub ?? null;
  const comment = await service.addComment(postId, userId, content)
  res.json(comment);
})
