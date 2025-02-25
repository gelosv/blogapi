import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(12),
  image: z.string().optional(),
  writerId: z.number(),
})

export type createPostDto = z.infer<typeof createPostSchema>

export const paginationPostSchema = z.object({
  page: z.string().optional().default("1").transform(Number).refine(n => Number.isInteger(n) && n > 0, { message: "El valor debe se un número positivo"}),
  limit: z.string().optional().default("10").transform(Number).refine(n => Number.isInteger(n) && n > 0, { message: "El valor debe se un número positivo"})
})

export type paginationDto = z.infer<typeof paginationPostSchema>
