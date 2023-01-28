// user global state

import { atom, useRecoilState } from 'recoil'

type UserState = { id: number; name: string } | null

const userState = atom<UserState>({
  key: 'user',
  default: null,
})

export const useUserState = () => {
  const [user, setUser] = useRecoilState<UserState>(userState)

  return { user, setUser }
}
