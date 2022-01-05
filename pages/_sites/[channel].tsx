import YoutubeVideo from '@/common/YoutubeVideo';
import { GetStaticPaths, GetStaticProps } from 'next';
import CountUp from 'react-countup';
import Head from 'next/head';
import supabase from 'libs/supabase';
import { NextSeo } from 'next-seo';
import { Channel } from '@/utils/types';

// @ts-ignore
const Page = ({ data }) => {
  return (
    <div className='text-white bg-black'>
      <NextSeo
        title={data?.title}
        description={data?.description}
        openGraph={{
          url: `https://${data?.subdomain}.chivel.tk`,
          title: data?.title,
          description: data?.description,
          images: [
            {
              url: data?.ogimage,
              height: 600,
              width: 1200,
              alt: 'Chivel: Get a landing page for your YouTube channel in seconds.',
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@lalitcodes',
        }}
      />
      <Head>
        <title>
          {data?.title
            .split(' ')
            .map((w: string) => w[0].toUpperCase() + w.substr(1).toLowerCase())
            .join(' ')}{' '}
          : {data?.description}
        </title>
        <link rel='shortcut icon' href={data?.avatar} type='image/png' />
        <style dangerouslySetInnerHTML={{ __html: data?.custom_css }}></style>
        <div dangerouslySetInnerHTML={{ __html: data?.custom_head }}></div>
      </Head>
      {data.announcement[0] && data.announcement[0] && (
        <a href={`${data.announcement[1]}`}>
          <div className='bg-blue-500 text-center py-3 text-white hover:bg-blue-600 w-screen '>
            <p className='text-base'>
              {data.announcement[0]} {'->'}
            </p>
          </div>
        </a>
      )}
      <div className='flex flex-col justify-between w-full max-w-4xl py-6 mx-auto sm:px-0'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <nav className='container flex items-center justify-between px-4 mx-auto md:px-6 sticky top-0 bg-black'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data?.avatar}
            className='rounded-full'
            width='50'
            height='50'
            alt={data?.title}
            loading='eager'
          />
          <ul className='flex gap-4'>
            {/* @ts-ignore */}
            {data?.navLinks.map((link, index) => {
              const [name, url] = link.split('||');
              return (
                <a
                  href={url}
                  rel='noopener noreferrer'
                  target='_blank'
                  key={index}
                  className='inline-block mx-2 px-2 py-1 text-white bg-black hover:bg-gray-800'>
                  {name}
                </a>
              );
            })}
          </ul>
        </nav>
        <main className='flex items-center justify-center' style={{ minHeight: 'calc(100vh - 82px)' }}>
          <div className='text-center'>
            <div className='relative'>
              <div className='absolute max-w-xl mx-auto -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-50 transition filter blur-2xl duration-1000 animate-tilt'></div>
              <h1 className='font-extrabold capitalize text-7xl mt-32'>
                {data?.title}
              </h1>
            </div>
            <p className='max-w-2xl px-4 mx-auto mt-8 text-lg text-gray-400 md:px-6'>
              {data?.description}
            </p>
            <div className='my-20'>
              <a
                href={`https://youtube.com/channel/${data?.id}`}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block px-12 py-4 text-2xl mt-20 font-bold text-gray-200 transition-all duration-150 transform bg-gray-900 border border-gray-800 rounded font-cal hover:text-gray-100 hover:scale-105'>
                Visit channel &rarr;
              </a>
            </div>
          </div>
        </main>
      </div>

      <section className='relative py-20 text-2xl bg-red-500 bg-center bg-no-repeat bg-cover backdrop-filter backdrop-blur-md backdrop-opacity-70'>
        <div className='flex flex-col items-center justify-between w-full max-w-4xl gap-6 mx-auto text-center md:text-left md:gap-0 md:flex-row'>
          <div>
            <p className='text-5xl font-bold font-cal'>
              <CountUp
                duration={3}
                delay={1}
                start={0}
                end={+data?.subscriberCount}
              />
            </p>
            <h3 className='font-extrabold text-black uppercase'>Subscribers</h3>
          </div>
          <div>
            <p className='text-5xl font-bold font-cal'>
              <CountUp
                duration={3}
                delay={1}
                start={0}
                end={+data?.videoCount}
              />
            </p>
            <h3 className='font-extrabold text-black uppercase'>Videos</h3>
          </div>
          <div>
            <p className='text-5xl font-bold font-cal'>
              <CountUp
                duration={3}
                delay={1}
                start={0}
                end={+data?.viewCount}
              />
            </p>
            <h3 className='font-extrabold text-black uppercase'>Total Views</h3>
          </div>
        </div>
      </section>
      <svg
        viewBox='0 0 1440 200'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'>
        <path
          fill='rgba(233, 66, 67, 1)'
          d='M 0 200 L 731 110 L 731 0 L 0 0 Z'
          strokeWidth='0'></path>{' '}
        <path
          fill='rgba(233, 66, 67, 1)'
          d='M 730 110 L 1440 200 L 1440 0 L 730 0 Z'
          strokeWidth='0'></path>{' '}
      </svg>
      <div className=''>
        <h1 className='text-4xl font-extrabold text-center mt-14'>
          Some of the latest ones
        </h1>
        <div className='w-full max-w-4xl gap-3 pb-10 mx-auto mt-20 flex flex-wrap'>
          {data?.videos.slice(0, 4).map((video: any) => {
            return (
              <YoutubeVideo
                videoUrl={video?.id.videoId}
                imageUrl={video?.snippet.thumbnails.medium.url}
                title={video?.snippet.title}
                key={video?.id.videoId}
              />
            );
          })}
        </div>
      </div>
      <section>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={data?.banner}
          alt=''
          className='w-screen h-60 object-cover mt-24'
        />
      </section>
    </div>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-ignore
  const { data, error }: { data: Channel } = await supabase
    .from('channels')
    .select('*')
    .eq('subdomain', params?.channel)
    .single();

  if (!data && error) {
    return {
      props: {
        error: error.message,
      },
    };
    // TODO:: handle error
  }

  const id = data.channel_id;
  const channelFetchUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CbrandingSettings%2Cstatistics&id=${id}&key=${process.env.YOUTUBE_API_KEY}`;
  const videoFetchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&maxResults=10&order=date&key=${process.env.YOUTUBE_API_KEY}`;
  const get = async (url: string) => await fetch(url).then((res) => res.json());
  const channelData = {
    data: await get(channelFetchUrl),
  };
  const videoData = {
    data: await get(videoFetchUrl),
  };

  console.log(videoData.data);
  const requiredData = {
    id: channelData.data.items[0].id,
    title: channelData.data.items[0].snippet.title,
    description: data.channel_description,
    avatar: channelData.data.items[0].snippet.thumbnails.default.url,
    banner: channelData.data.items[0].brandingSettings.image.bannerExternalUrl,
    subscriberCount: channelData.data.items[0].statistics.subscriberCount,
    videoCount: channelData.data.items[0].statistics.videoCount,
    viewCount: channelData.data.items[0].statistics.viewCount,
    videos: videoData.data.items,
    announcement: [data.announcement_text, data.announcement_url],
    navLinks: data?.navbarLinks,
    style: data.custom_css,
    head: data.custom_head,
    subdomain: params?.channel,
    ogimage:
      channelData.data.items[0].brandingSettings.image.bannerExternalUrl ||
      data.og_image_url,
  };
  return {
    props: {
      data: requiredData,
    },
    revalidate: 60 * 60,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
