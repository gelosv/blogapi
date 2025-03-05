import { z } from 'zod'

export const userRegisterSchema = z.object({
  name: z.string().min(4),
  lastname: z.string().optional(),
  nickname: z.string().min(4),
  password: z.string(),
  rol: z.enum(['USER', 'WRITER'])
})

export const userLoginSchema = z.object({
  nickname: z.string().min(4),
  password: z.string(),
})
