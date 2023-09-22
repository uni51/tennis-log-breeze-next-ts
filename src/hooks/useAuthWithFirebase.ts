// import { apiClient } from '@/lib/utils/apiClient'
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  signOut,
  // Auth not found in '@firebase/auth' のエラーが出るので
  // eslint-disable-next-line
  Auth,
} from '@firebase/auth'
import { useCallback, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { LoginError } from '@/types/authError'

export const useAuthWithFirebase = (auth: Auth) => {
  const { firebaseLogin, firebaseLogout } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })
  const provider = new GoogleAuthProvider()
  const [, setErrors] = useState<LoginError | null>(null)
  const [, setStatus] = useState<string | null>(null)
  //------------------
  const [state, setState] = useState<
    'idel' | 'progress' | 'logined' | 'logouted' | 'disabled' | 'error'
  >('idel')
  const [error, setError] = useState<unknown>('')
  const [credential, setCredential] = useState<any>()
  const [result, setResult] = useState<any>()

  const dispatch = useCallback(
    (action: { type: 'login'; payload?: { token: string } } | { type: 'logout' }) => {
      setError('')
      switch (action.type) {
        case 'login':
          setState('progress')
          const token = action.payload?.token
          if (token) {
            signInWithCredential(auth, GoogleAuthProvider.credential(token))
              .then(async (result) => {
                setCredential(result)
                setState('logined')
                setResult(result)
                firebaseLogin({
                  idToken: await auth.currentUser?.getIdToken(true),
                  // idToken: await auth.currentUser?.getIdToken(true),
                  setErrors,
                  setStatus,
                })
              })
              .catch((e) => {
                // console.log(e.code)
                // console.log(e.message)
                // FirebaseのTokenが期限切れの場合や、Firebaseのアカウントが無効化された場合は、ログアウト状態にする
                if (e.code === 'auth/invalid-credential') {
                  setCredential(undefined)
                  setState('logouted')
                } else if (e.code === 'auth/user-disabled') {
                  setCredential(undefined)
                  setState('disabled')
                } else {
                  setError(e)
                  setState('error')
                }
              })
          } else {
            signInWithPopup(auth, provider)
              .then((result) => {
                setCredential(result)
                setState('logined')
              })
              .catch((e) => {
                setError(e)
                setState('error')
              })
          }
          break
        case 'logout':
          setState('progress')
          signOut(auth)
            .then(() => {
              setCredential(undefined)
              setState('logouted')
              firebaseLogout()
            })
            .catch((e) => {
              setError(e)
              setState('error')
            })
          break
      }
    },
    [auth],
  )
  return { state, error, credential, result, dispatch }
}
