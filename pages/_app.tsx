import type { AppProps } from 'next/app'
import '../styles/globals.css'
import Inspect from 'inspx'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Inspect>
      <Component {...pageProps} />
    </Inspect>
  )
}

export default MyApp
