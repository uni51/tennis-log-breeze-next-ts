import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProfileForm } from '@/types/form/profile/ProfileForm'
import { ProfileSchema } from '@/lib/schema/profileSchema'
import { User } from '@/types/User'
import { Profile } from '@/types/Profile'
import { useState } from 'react'

// ProfileForm のカスタムフック
function useProfileEditForm(user: User, profile: Profile) {
  // フォームの初期値を設定するためのデフォルト値
  const defaultValues = {
    name: user.data?.name, // 名前
    nickname: user.data?.nickname, // ニックネーム
    career_id: String(profile.career_id), // テニス歴
    gender_id: String(profile.gender_id), // 性別
    dominantHand_id: String(profile.dominant_hand_id), // 利き手
    playFrequency_id: String(profile.play_frequency_id), // プレー頻度
    tennisLevel_id: String(profile.tennis_level_id), // テニスのレベル
  }

  const [errorMessage, setErrorMessage] = useState<string>('')

  // useForm フックを使ってフォームのメソッドと状態を管理
  const methods = useForm<ProfileForm>({
    defaultValues,
    resolver: zodResolver(ProfileSchema),
  })

  return methods
}

export default useProfileEditForm
