// PrivateRoute.jsx
import React, { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import useCheckLoggedIn from '@/hooks/checkLoggedIn'
import { Loading } from '@/components/Loading'

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const router = useRouter()
  const checkLoggedIn = useCheckLoggedIn()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      // ここで認証のチェックを行う
      const isLoggedIn = await checkLoggedIn()
      // console.log(isLoggedIn)
      if (!isLoggedIn) {
        router.push('/login')
      }
      setIsLoading(false)
    }
    init()
  }, [router, checkLoggedIn])

  if (isLoading) {
    return <Loading />
  }

  return <>{children}</>
}
