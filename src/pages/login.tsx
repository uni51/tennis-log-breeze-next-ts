// import { apiClient } from '@/lib/utils/apiClient'
import { initializeApp } from '@firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithCredential,
  signOut,
  // Auth not found in '@firebase/auth' のエラーが出るので
  // eslint-disable-next-line
  Auth,
} from '@firebase/auth'
import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { firebaseConfig } from '@/lib/firebase-helpers'
import { LoginError } from '@/types/authError'

const useAuthWithFirebase = (auth: Auth) => {
  const { firebaseLogin, firebaseLogout } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })
  const [errors, setErrors] = useState<LoginError | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  //------------------
  const [state, setState] = useState<'idel' | 'progress' | 'logined' | 'logouted' | 'error'>('idel')
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
                  // idToken: JSON.stringify(result._tokenResponse.idToken),
                  /* @ts-ignore */
                  idToken: JSON.stringify(result._tokenResponse.idToken),
                  // idToken: JSON.stringify(token),
                  setErrors,
                  setStatus,
                })
                // mutate(response.data)
                // console.log(data)
                // バックエンドにtokenを送る
                // apiClient
                //   .post('/auth/login', {
                //     idToken: JSON.stringify(idToken),
                //   })
                //   .then((response: any) => {
                //     console.log(response)
                //     // ここでLaravelのPassportでセットした（返却された）Bearer用のトークンをセットする
                //   })
                //   .catch((err: any) => {
                //     console.log(err)
                //   })
              })
              .catch((e) => {
                setError(e)
                setState('error')
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

const auth = getAuth(initializeApp(firebaseConfig))
const provider = new GoogleAuthProvider()

const Page = () => {
  const { state, dispatch, credential, error } = useAuthWithFirebase(auth)
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    console.log(token)
    if (token) {
      dispatch({ type: 'login', payload: { token } })
    }
  }, [dispatch])
  useEffect(() => {
    if (credential) {
      console.log(credential)
      const token = GoogleAuthProvider.credentialFromResult(credential)?.idToken
      token && sessionStorage.setItem('token', token)
      token && sessionStorage.setItem('idToken', credential._tokenResponse.idToken)
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
