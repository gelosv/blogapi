import { PrismaClient } from "@prisma/client";
import { categories, posts, users } from "../data/post.data";
import jwt from 'jsonwebtoken';

const client = new PrismaClient()

export async function insertCategories() {
  await client.categorie.createMany({
    data: categories
  })
}


export async function insertPosts() {
  await client.post.createMany({
    data: posts
  })
}

export async function insertUsers() {
  await client.user.createMany({
    data: users
  })
}

export async function deleteAll() {
  await client.postComments.deleteMany({})
  await client.userLikedPost.deleteMany({})
  await client.post.deleteMany({})
  await client.categorie.deleteMany({})
  await client.user.deleteMany({})
}

export function createJWT(key: string) {
  const data = {
    sub: users[1].id,
    nickname: users[1].nickname,
    name: users[1].name
  }
  const token = jwt.sign(data, key, {
    expiresIn: '1h'
  })
  return token;
}
