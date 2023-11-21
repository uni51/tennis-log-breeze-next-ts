import 'tailwindcss/tailwind.css'
import 'nprogress/nprogress.css'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps, NextWebVitalsMetric } from 'next/app'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
// eslint-disable-next-line
import { ErrorBoundary, FallbackProps } from 'react-error-boundary' // build時に、FallbackProps not found in 'react-error-boundary' のエラーが出る
import { AlertModalManager } from '@/components/AlertModalManager'
import { ErrorDisplay } from '@/components/Layouts/Error/ErrorDisplay'
import { AuthProvider } from '@/features/auth/provider/authProvider'

// export function reportWebVitals(metric: NextWebVitalsMetric) {
//   switch (metric.name) {1
//     case 'FCP':
//       console.log(`FCP: ${Math.round(metric.value * 10) / 10}`)
//       break
//     case 'LCP':
//       console.log(`LCP: ${Math.round(metric.value * 10) / 10}`)
//       break
//     case 'TTFB':
//       console.log(`TTFB: ${Math.round(metric.value * 10) / 10}`)
//       break
//     case 'Next.js-hydration':
//       console.log(
//         `Hydration: ${Math.round(metric.startTime * 10) / 10} -> ${
//           Math.round((metric.startTime + metric.value) * 10) / 10
//         }`,
//       )
//       break
//     default:
//       break
//   }
// }

// プロジェクト全体でのReactQueryの設定
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

function App({ Component, pageProps }: AppProps) {
  // See) https://github.com/vercel/next.js/tree/canary/examples/with-loading
  const router = useRouter()

  useEffect(() => {
    const handleStart = (url: string) => {
      // console.log(`Loading: ${url}`)
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

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary FallbackComponent={ErrorFallback} onError={onError}>
          <ToastContainer
            position='top-center'
            autoClose={1000}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
          />
          <AlertModalManager />
          <Component {...pageProps} />
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  )
  // return <Component {...pageProps} />
}

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <>
      <ErrorDisplay {...error} resetErrorBoundary={resetErrorBoundary} />
    </>
  )
  // return Modal({ children: error.message, show: true, onClose: resetErrorBoundary })
}

const onError = (error: Error, info: { componentStack: string }) => {
  console.error(error, info)
}

export default App
