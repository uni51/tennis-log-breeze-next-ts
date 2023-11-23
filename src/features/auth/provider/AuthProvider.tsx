import { initializeApp } from '@firebase/app'
// eslint-disable-next-line
import { getAuth, Auth } from '@firebase/auth' // build時に、Auth not found in '@firebase/auth' のエラーが出る
import React, { createContext, useContext, ReactNode, FC } from 'react'
import { firebaseConfig } from '@/lib/firebase-helpers'

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext<Auth | null>(null)

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const auth = getAuth(initializeApp(firebaseConfig))
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const useAuthContext = (): Auth | null => {
  return useContext(AuthContext)
}
