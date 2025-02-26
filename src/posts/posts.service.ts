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
    const limit = pagination.limit ?? 10;

    const posts = await this.prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit
    });
    return posts;
  }

  async postExits(postId: number) {
    const post = await this.prisma.post.findFirst({
      where: {
        id: postId
      },
      select: {
        id: true
      }
    })

    if(!post) throw boom.notFound('Post inexistente');
    
    return post;
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

  async getCommentsPost(postId: number) {
    await this.postExits(postId)
    const comments = await this.prisma.postComments.findMany({
      where: {
        postId
      },
      select: {
        content: true,
        id: true,
        user: {
          select: {
            id: true,
            nickname: true,
            name: true,
          }
        }
      }
    })

    return comments;
  }
}
