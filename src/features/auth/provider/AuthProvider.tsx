import React, { createContext, useContext, ReactNode, FC } from 'react'
import { initializeApp } from '@firebase/app'
import { getAuth, Auth } from '@firebase/auth'
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
