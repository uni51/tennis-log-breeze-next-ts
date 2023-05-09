// user global state

import { atom, useRecoilState } from 'recoil'

export type UserState = { id: number; name: string; email: string } | null

const userState = atom<UserState>({
  key: 'user',
  default: null,
})

export const useUserState = () => {
  const [user, setUser] = useRecoilState<UserState>(userState)

  return { user, setUser }
}
