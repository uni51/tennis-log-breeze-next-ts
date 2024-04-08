import * as z from 'zod'

// `body`フィールドのカスタムバリデーションを追加
const bodyValidation = z.string().refine((val) => val.trim() !== '' && val !== '<p><br></p>', {
  message: '内容を入力してください。', // エラーメッセージ
})

export const MemoPostSchema = z.object({
  title: z.string().min(1, { message: '必須入力です。' }),
  body: bodyValidation,
  category_id: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
  tags: z.array(z.string()).optional(), // タグは任意で、文字列の配列
  status: z
    .string()
    .min(1, { message: 'Query parameter is required' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val), { message: '不正な値です' }),
})
