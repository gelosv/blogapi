import { z } from 'zod'

export const createCommentSchema = z.object({
  postId: z.number(),
  content: z.string().trim().min(5)
})
