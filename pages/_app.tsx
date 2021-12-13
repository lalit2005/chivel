import '../styles/globals.css';
import type { AppProps } from 'next/app';
import '@grikomsn/cal-sans';
import { UserContextProvider } from '@/utils/contexts/useUser';
import { SWRConfig } from 'swr';
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';
import { NextSeo } from 'next-seo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className='font-sans'>
      <NextSeo
        title='Chivel: Get a landing page for your YouTube channel.'
        description='Just let Chivel know about a YouTube channel, and we get you a blazing fast and SEO friendly landing page for your amazing YT channel'
        openGraph={{
          url: 'https://chivel.tk',
          title: 'Chivel: Get a landing page for your YouTube channel.',
          description:
            'Just let Chivel know about a YouTube channel, and we get you a blazing fast and SEO friendly landing page for your amazing YT channel',
          images: [
            {
              url: 'https://chivel.tk/ogimage.png',
              height: 600,
              width: 1200,
              alt: 'Chivel',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
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
