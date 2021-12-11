import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '@grikomsn/cal-sans';
import { UserContextProvider } from '@/utils/contexts/useUser';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='font-sans'>
      <UserContextProvider>
        <SWRConfig
          value={{ fetcher: (url) => fetch(url).then((res) => res.json()) }}>
          <Component {...pageProps} />
        </SWRConfig>
      </UserContextProvider>
    </div>
  );
}

export default MyApp;
