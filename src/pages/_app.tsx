import 'tailwindcss/tailwind.css'
import 'nprogress/nprogress.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import React, { useEffect } from 'react'

function App({ Component, pageProps }: AppProps) {
  // See.) https://github.com/vercel/next.js/tree/canary/examples/with-loading
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url: string) => {
      console.log(`Loading: ${url}`)
      NProgress.start()
    }

    const handleStop = () => {
      NProgress.done()
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return <Component {...pageProps} />
}

export default App
