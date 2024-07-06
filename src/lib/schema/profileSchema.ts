import * as z from 'zod'

export const ProfileSchema = z.object({
  name: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  nickname: z.string().min(1, { message: '1文字以上入力する必要があります。' }),
  career_id: z
    .string()
    .min(1, { message: 'テニス歴を選択してください' })
    .max(2, { message: 'テニス歴を選択してください' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val) && val !== 0, { message: 'テニス歴を選択してください' }),
  gender_id: z
    .string()
    .min(1, { message: '性別を選択してください' })
    .max(1, { message: '性別を選択してください' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val) && val !== 0, { message: '性別を選択してください' }),
  dominantHand_id: z
    .string()
    .min(1, { message: '利き手を選択してください' })
    .max(1, { message: '利き手を選択してください' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val) && val !== 0, { message: '利き手を選択してください' }),
  playFrequency_id: z
    .string()
    .min(1, { message: 'プレー頻度を選択してください' })
    .max(1, { message: 'プレー頻度を選択してください' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val) && val !== 0, { message: 'プレー頻度を選択してください' }),
  tennisLevel_id: z
    .string()
    .min(1, { message: 'レベルを選択してください' })
    .max(1, { message: 'レベルを選択してください' })
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val) && val !== 0, { message: 'レベルを選択してください' }),
  // birthYear: z
  //   .string()
  //   .min(4, '年を選択してください')
  //   .refine((val) => val !== '0000', { message: '年を選択してください' }),
  // birthMonth: z
  //   .string()
  //   .min(1, '月を選択してください')
  //   .refine((val) => val !== '0', { message: '月を選択してください' }),
  // birthDay: z
  //   .string()
  //   .min(1, '日を選択してください')
  //   .refine((val) => val !== '0', { message: '日を選択してください' }),
})
