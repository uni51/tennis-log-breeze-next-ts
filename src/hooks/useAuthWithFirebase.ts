import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  signOut,
  Auth,
} from '@firebase/auth'
import { useCallback, useState } from 'react'
import { useAuthQuery } from '@/hooks/authQuery'

// ユーザーステータスの定数
const UserStatus = {
  IDLE: 'idle',
  PROGRESS: 'progress',
  LOGGED: 'logged',
  LOGGED_OUT: 'loggedOut',
  DISABLED: 'disabled',
  ERROR: 'error',
}

export const useAuthWithFirebase = (auth: Auth) => {
  const { firebaseLogin, firebaseLogout } = useAuthQuery({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const provider = new GoogleAuthProvider()

  // ステートの初期化
  const [status, setStatus] = useState(UserStatus.IDLE)
  const [errors, setErrors] = useState<unknown>('')
  const [credential, setCredential] = useState<any>()
  const [result, setResult] = useState<any>()

  // ログイン処理
  const handleLogin = async (token: string | undefined) => {
    try {
      const result = token
        ? await signInWithCredential(auth, GoogleAuthProvider.credential(token))
        : await signInWithPopup(auth, provider)

      setCredential(result)
      setStatus(UserStatus.LOGGED)

      if (token) {
        const idToken = await auth.currentUser?.getIdToken(true)
        await firebaseLogin(idToken!)
      }
    } catch (e) {
      handleAuthError(e)
    }
  }

  // ログアウト処理
  const handleLogout = async () => {
    try {
      await signOut(auth)
      setCredential(undefined)
      setStatus(UserStatus.LOGGED_OUT)
      await firebaseLogout()
    } catch (e) {
      handleAuthError(e)
    }
  }

  // 認証エラー処理
  const handleAuthError = (e: any) => {
    if (typeof e === 'object' && e !== null && 'code' in e) {
      if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-disabled') {
        setCredential(undefined)
        setStatus(UserStatus.LOGGED_OUT)
      } else {
        setErrors(e)
        setStatus(UserStatus.ERROR)
      }
    }
  }

  // ディスパッチ関数
  const dispatch = useCallback(
    async (action: { type: 'login'; payload?: { token: string } } | { type: 'logout' }) => {
      setErrors('')
      setStatus(UserStatus.PROGRESS)

      try {
        switch (action.type) {
          case 'login':
            await handleLogin(action.payload?.token)
            break

          case 'logout':
            await handleLogout()
            break
        }
      } catch (e) {
        handleAuthError(e)
      }
    },
    [auth],
  )

  return { status, errors, credential, result, dispatch }
}
