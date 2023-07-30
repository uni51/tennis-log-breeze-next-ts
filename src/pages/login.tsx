import { apiClient } from '@/lib/utils/apiClient'
import { initializeApp } from '@firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  signInWithCredential,
  signOut,
  Auth,
} from '@firebase/auth'
import { useCallback, useEffect, useState } from 'react'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APP_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_APP_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_APP_MEASUREMENT_ID,
}

type ExtraUserCredential = UserCredential & {
  _tokenResponse: {
    federatedId: string
    providerId: 'google.com'
    email: string
    emailVerified: boolean
    localId: string
    idToken: string
    refreshToken: string
    expiresIn: number
    oauthIdToken: string
    rawUserInfo: string
    kind: string
  }
}

const useAuth = (auth: Auth) => {
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
                const idToken = await getAuth().currentUser?.getIdToken()
                // バックエンドにtokenを送る
                apiClient
                  .post('/auth/login', {
                    idToken: JSON.stringify(idToken),
                  })
                  .then((response: any) => {
                    console.log(response)
                    // ここでLaravelのPassportでセットした（返却された）Bearer用のトークンをセットする
                  })
                  .catch((err: any) => {
                    console.log(err)
                  })
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
  const { state, dispatch, credential, error } = useAuth(auth)
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
      dispatch({ type: 'login', payload: { token } })
    }
  }, [dispatch])
  useEffect(() => {
    if (credential) {
      const token = GoogleAuthProvider.credentialFromResult(credential)?.idToken
      token && sessionStorage.setItem('token', token)
    } else {
      sessionStorage.removeItem('token')
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
