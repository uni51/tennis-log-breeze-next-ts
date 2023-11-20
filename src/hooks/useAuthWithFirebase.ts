import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  signOut,
  Auth,
} from '@firebase/auth'
import { useCallback, useState } from 'react'
import { useAuthQuery } from '@/hooks/authQuery'

const initialState = {
  idle: 'idle',
  progress: 'progress',
  logged: 'logged',
  loggedOut: 'loggedOut',
  disabled: 'disabled',
  error: 'error',
}

export const useAuthWithFirebase = (auth: Auth) => {
  const { firebaseLogin, firebaseLogout } = useAuthQuery({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const provider = new GoogleAuthProvider()

  const [status, setStatus] = useState(initialState.idle)
  const [errors, setErrors] = useState<unknown>('')
  const [credential, setCredential] = useState<any>()
  const [result, setResult] = useState<any>()

  const handleLogin = async (token: string | undefined) => {
    const result = token
      ? await signInWithCredential(auth, GoogleAuthProvider.credential(token))
      : await signInWithPopup(auth, provider)

    setCredential(result)
    setStatus(initialState.logged)

    if (token) {
      const idToken = await auth.currentUser?.getIdToken(true)
      await firebaseLogin(idToken!)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    setCredential(undefined)
    setStatus(initialState.loggedOut)
    await firebaseLogout()
  }

  const handleAuthError = (e: any) => {
    if (typeof e === 'object' && e !== null && 'code' in e) {
      if (e.code === 'auth/invalid-credential' || e.code === 'auth/user-disabled') {
        setCredential(undefined)
        setStatus(initialState.loggedOut)
      } else {
        setErrors(e)
        setStatus(initialState.error)
      }
    }
  }

  const dispatch = useCallback(
    async (action: { type: 'login'; payload?: { token: string } } | { type: 'logout' }) => {
      setErrors('')
      setStatus(initialState.progress)

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
