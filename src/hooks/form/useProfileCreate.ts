import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProfileForm } from '@/features/settings/profile/lib/postCreateProfile'
import { ProfileSchema } from '@/lib/schema/profileSchema'
import { User } from '@/types/User'

// フォームの初期値を設定するためのデフォルト値
const defaultValues = {
  name: '', // ユーザーの名前
  nickname: '', // ニックネーム
  career_id: '0', // テニス歴
  gender_id: '0', // 性別
  dominantHand_id: '0', // 利き手
  playFrequency_id: '0', // プレー頻度
  tennisLevel_id: '0', // テニスのレベル
  birthYear: '2000', // 生年月日の年
  birthMonth: '1', // 生年月日の月
  birthDay: '1', // 生年月日の日
}

// ProfileForm のカスタムフック
function useProfileCreateForm(user: User) {
  // useForm フックを使ってフォームのメソッドと状態を管理
  const methods = useForm<ProfileForm>({
    defaultValues: {
      ...defaultValues,
      name: user.data?.name,
      nickname: user.data?.nickname,
      // ここでユーザーの既存のデータを初期値として設定
    },
    resolver: zodResolver(ProfileSchema),
  })

  return methods
}

export default useProfileCreateForm
