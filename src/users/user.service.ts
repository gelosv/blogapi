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
}