import * as z from 'zod'

export const AdminLoginSchema = z.object({
  email: z.string().min(1, { message: '必須入力です。' }),
  password: z.string().min(1, { message: '必須入力です。' }),
})
