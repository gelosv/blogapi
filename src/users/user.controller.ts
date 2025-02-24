import { Request, Response, NextFunction } from "express";
import { UserService } from "./user.service";
const service = new UserService();

export const likePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = 1; // req.user.id - usuario debe estar autenticado
    const postId = +req.params.postId;

    const postLiked = await service.likePost(postId, userId);
    res.json(postLiked);
  } catch (error) {
    next(error)
  }
};

export const getLikedPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = 1; // obtener del token del usuario autenticado
    const posts = await service.getLikePosts(userId);
    res.json(posts);
  } catch (error) {
    next(error);
  }
}
