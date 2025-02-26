import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(5, 'El título debe tener mínimo 5 caracteres'),
  content: z.string().min(12, 'El contenido debe tener mínimo 12 caracteres'),
  image: z.string().optional(),
  categorieId: z.number()
})

export const paginationPostSchema = z.object({
  page: z.string().optional().default("1").transform(Number).refine(n => Number.isInteger(n) && n > 0, { message: "El valor debe se un número positivo"}),
  limit: z.string().optional().default("10").transform(Number).refine(n => Number.isInteger(n) && n > 0, { message: "El valor debe se un número positivo"})
})

export type paginationDto = z.infer<typeof paginationPostSchema>
