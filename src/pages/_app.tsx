import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import React from 'react'

function App({ Component, pageProps }: AppProps) {
  // suppress useLayoutEffect warnings when running outside a browser
  if (!process.browser) React.useLayoutEffect = React.useEffect

  return <Component {...pageProps} />
}

export default App
