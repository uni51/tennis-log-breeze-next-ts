import { initializeApp } from '@firebase/app'
import { getAuth, GoogleAuthProvider } from '@firebase/auth'
import { useEffect, useState } from 'react'
import { useAuthWithFirebase } from '@/hooks/useAuthWithFirebase'
import { firebaseConfig } from '@/lib/firebase-helpers'

const initializeFirebaseAuth = () => getAuth(initializeApp(firebaseConfig))

const Login = () => {
  const auth = initializeFirebaseAuth()
  const { status, dispatch, credential, errors } = useAuthWithFirebase(auth)
  const [checkToken, setCheckToken] = useState<string | null>(null)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      dispatch({ type: 'login', payload: { token } })
    }
  }, [dispatch])

  useEffect(() => {
    const updateSessionToken = () => {
      const token = GoogleAuthProvider.credentialFromResult(credential)?.idToken
      if (token && checkToken !== token) {
        setCheckToken(credential._tokenResponse.oauthIdToken)
        sessionStorage.setItem('token', token)
        dispatch({ type: 'login', payload: { token } })
      }
    }

    if (credential) {
      updateSessionToken()
    } else {
      sessionStorage.removeItem('token')
    }
  }, [credential, checkToken, dispatch])

  const handleLogin = () => dispatch({ type: 'login' })
  const handleLogout = () => dispatch({ type: 'logout' })

  return (
    <div>
      <button onClick={handleLogin}>ログイン</button>
      <button onClick={handleLogout}>ログアウト</button>
      <div>User: {credential?.user.displayName}</div>
      <div>State: {status}</div>
      <div>Error: {errors ? errors.toString() : 'No errors'}</div>
    </div>
  )
}

export default Login
