// import { apiClient } from '@/lib/utils/apiClient'
import { initializeApp } from '@firebase/app'
import { getAuth, GoogleAuthProvider } from '@firebase/auth'
import { useEffect, useState } from 'react'
import { firebaseConfig } from '@/lib/firebase-helpers'
import { useAuthWithFirebase } from '@/hooks/useAuthWithFirebase'

const auth = getAuth(initializeApp(firebaseConfig))

const Page = () => {
  const { state, dispatch, credential, error } = useAuthWithFirebase(auth)
  const [checkToken, setCheckToken] = useState<string | null>(null)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      dispatch({ type: 'login', payload: { token } })
    }
  }, [dispatch])

  useEffect(() => {
    if (credential) {
      // console.log(credential)
      const token = GoogleAuthProvider.credentialFromResult(credential)?.idToken
      token && sessionStorage.setItem('token', token)
      if (token && checkToken !== token) {
        setCheckToken(credential._tokenResponse.oauthIdToken)
        dispatch({ type: 'login', payload: { token } })
      }
    } else {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('idToken')
    }
  }, [credential])

  const handleLogin = () => dispatch({ type: 'login' })
  const handleLogout = () => dispatch({ type: 'logout' })
  return (
    <div>
      <button onClick={handleLogin}>ログイン</button>
      <button onClick={handleLogout}>ログアウト</button>
      <div>User: {credential?.user.displayName}</div>
      <div>State: {state}</div>
      <div>Error: {String(error)}</div>
    </div>
  )
}

export default Page
