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
import { useAuthQuery } from '@/hooks/authQuery'

export const useAuthWithFirebase = (auth: Auth) => {
  const { firebaseLogin, firebaseLogout } = useAuthQuery({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  const provider = new GoogleAuthProvider()

  const [status, setStatus] = useState<
    'idle' | 'progress' | 'logged' | 'loggedOut' | 'disabled' | 'error'
  >('idle')

  const [errors, setErrors] = useState<unknown>('')
  const [credential, setCredential] = useState<any>()
  const [result, setResult] = useState<any>()

  const dispatch = useCallback(
    async (action: { type: 'login'; payload?: { token: string } } | { type: 'logout' }) => {
      setErrors('')
      setStatus('progress')

      try {
        switch (action.type) {
          case 'login':
            const token = action.payload?.token

            if (token) {
              const result = await signInWithCredential(auth, GoogleAuthProvider.credential(token))
              setCredential(result)
              setStatus('logged')
              setResult(result)

              const idToken = await auth.currentUser?.getIdToken(true)
              // console.log(idToken)
              await firebaseLogin(idToken!)
            } else {
              const result = await signInWithPopup(auth, provider)
              setCredential(result)
              setStatus('logged')
            }
            break

          case 'logout':
            await signOut(auth)
            setCredential(undefined)
            setStatus('loggedOut')
            await firebaseLogout()
            break
        }
      } catch (e) {
        if (typeof e === 'object' && e !== null && 'code' in e) {
          if (e.code === 'auth/invalid-credential') {
            setCredential(undefined)
            setStatus('loggedOut')
          } else if (e.code === 'auth/user-disabled') {
            setCredential(undefined)
            setStatus('disabled')
          } else {
            setErrors(e)
            setStatus('error')
          }
        }
      }
    },
    [auth],
  )

  return { status, errors, credential, result, dispatch }
}
