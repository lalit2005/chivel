import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '@grikomsn/cal-sans';
import { UserContextProvider } from '@/utils/contexts/useUser';
import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='font-sans'>
      {process.env.NODE_ENV === 'production' && (
        <Script
          strategy='lazyOnload'
          data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_ID}
          src={process.env.NEXT_PUBLIC_ANALYTICS_URL}
        />
      )}
      <UserContextProvider>
        <SWRConfig
          value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}>
          <Component {...pageProps} />
        </SWRConfig>
        <Toaster />
      </UserContextProvider>
    </div>
  );
}

export default MyApp;
