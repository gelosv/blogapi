import { Post } from "./interfaces/post-create.interface";
import { PrismaClient } from '@prisma/client'

export class PostService {
  private readonly prisma = new PrismaClient()
  async createPost(post: Post) {
    const newPost = await this.prisma.post.create({
      data: post
    })
    return newPost;
  }
}
