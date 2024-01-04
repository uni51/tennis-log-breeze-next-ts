import * as z from 'zod'

export const MemoPostSchema = z.object({
  title: z.string().min(1, { message: '必須入力です。' }),
  body: z.string().min(1, { message: '必須入力です。' }),
  category_id: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
  tags: z.array(z.string()),
  status_id: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
})
