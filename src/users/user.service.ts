import { PrismaClient } from '@prisma/client'
import boom from '@hapi/boom'

export class UserService {
  private readonly prisma = new PrismaClient();

  async likePost(postId: number, userId: number) {
    const postExist = await this.prisma.post.findFirst({
      where: {
        id: postId,
      }
    })

    if(!postExist) throw boom.notFound('Post inexistente')

    const result = await this.prisma.userLikedPost.create({
      data: {
        postId,
        userId
      },
      include: {
        post: {
          select: {
            title: true,
            createdAt: true,
            writerId: true
          }
        }
      }
    })

    return result
  }

  async unlikePost(postId: number, userId: number) {
    const postExist = await this.prisma.userLikedPost.findUnique({
      where: {
        postId_userId: {
          postId,
          userId
        }
      }
    })

    if(!postExist) throw boom.notFound('No like post o post no existe')

    const result = await this.prisma.userLikedPost.delete({
      where: {
        postId_userId: {
          postId,
          userId
        }
      }
    })

    return result
  }

 async getLikePosts(userId: number) {
    const postsLiked = await this.prisma.userLikedPost.findMany({
      where: {
        userId
      },
      select: {
        postId: false,
        post: {
          select: {
            id: true,
            title: true,
            image: true,
          }
        }
      },
    })
    return postsLiked;
  }

  async addComment(postId: number, userId: number, content: string) {
    const postExist = await this.prisma.post.findFirst({
      where: {
        id: postId
      },
      select: {
        id: true
      }
    })

    if(!postExist) throw boom.notFound('Post inexistente');

    const comment = await this.prisma.postComments.create({
      data: {
        postId,
        userId,
        content
      }
    })

    return comment;
  }

  async getUserById(userId: number) {
    const user = await this.prisma.user.findFirst({
      where: {
        id: userId
      }
    })

    if(!user) throw boom.notFound('Usuario no existe');
    return user;
  }
}
