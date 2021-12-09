import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@grikomsn/cal-sans'
import { UserContextProvider } from '@/utils/contexts/useUser'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='font-sans'>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </div>
  )
}

export default MyApp
