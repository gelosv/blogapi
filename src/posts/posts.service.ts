import { Pagination } from "./dto/pagination.interface";
import { Post } from "./interfaces/post-create.interface";
import { PrismaClient } from '@prisma/client'
import boom from '@hapi/boom'

export class PostService {
  private readonly prisma = new PrismaClient()

  async createPost(post: Post) {
    const newPost = await this.prisma.post.create({
      data: post
    })
    return newPost;
  }

  async getPosts(pagination: Pagination) {
    const page = pagination.page ?? 1;
    const limit = pagination.limit ?? 5;

    const posts = await this.prisma.post.findMany({
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit)
    });
    return posts;
  }
  // realizar un método que solo valide la existencia de un post?
  async getPostById(postId: number) {
    const post = await this.prisma.post.findFirst({
      where: {
        id: postId
      },
      include: {
        writer: {
          select: {
            name: true,
            lastname: true,
            nickname: true
          }
        }
      }
    })

    if(!post) throw boom.notFound('Post inexistente');

    const numLikePost = await this.prisma.userLikedPost.count({
      where: {
        postId
      }
    })
    console.log(numLikePost, 'número de likes');
    return {
      ...post,
      qtyLikes: numLikePost
    };
  }
}
