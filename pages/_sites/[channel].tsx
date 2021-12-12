import YoutubeVideo from '@/common/YoutubeVideo';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import CountUp from 'react-countup';

// @ts-ignore
const Page = ({ data }) => {
  const navLinks = [
    {
      text: 'Apple',
      href: 'https://apple.com',
    },
    {
      text: 'Google',
      href: 'https://google.com',
    },
  ];

  return (
    <div className='text-white bg-black'>
      <div className='flex flex-col justify-between w-full max-w-4xl min-h-screen py-6 mx-auto sm:px-0'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <nav className='container flex items-center justify-between px-4 mx-auto md:px-6'>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.avatar} width='50' height='50' alt={data.title} />
          <ul className='flex gap-4'>
            {navLinks.map((navLink, index) => {
              return (
                <li key={index}>
                  <a
                    href={navLink.href}
                    key={navLink.text}
                    className='opacity-75 hover:opacity-100'>
                    {navLink.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <main className='-mt-10'>
          <div className='text-center'>
            <div className='relative'>
              <div className='absolute max-w-xl mx-auto -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-50 transition filter blur-2xl duration-1000 animate-tilt'></div>
              <h1 className='font-extrabold capitalize text-7xl'>
                {data.title}
              </h1>
            </div>
            <p className='max-w-2xl px-4 mx-auto mt-8 text-lg text-gray-400 md:px-6'>
              {data.description}
            </p>
            <div className='my-20'>
              <a
                href={`https://youtube.com/channel/${data.id}`}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-block px-12 py-4 text-2xl font-bold text-gray-200 transition-all duration-150 transform bg-gray-900 border border-gray-800 rounded font-cal hover:text-gray-100 hover:scale-105'>
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
        <h1 className='text-4xl font-extrabold text-center'>
          Some of the latest ones :)
        </h1>
        <div className='grid w-full max-w-4xl grid-cols-1 gap-3 pb-10 mx-auto mt-20 gap-y-10 sm:grid-cols-2'>
          {data.videos.slice(0, 4).map((video: any) => {
            return (
              <div key={video?.id.videoId}>
                <YoutubeVideo
                  videoUrl={video?.id.videoId}
                  imageUrl={video?.snippet.thumbnails.medium.url}
                  title={video?.snippet.title}
                />
              </div>
            );
          })}
        </div>
      </div>
      <section></section>
    </div>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = 'UCsBjURrPoezykLs9EqgamOA';
  const channelFetchUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CbrandingSettings%2Cstatistics&id=${id}&key=${process.env.YOUTUBE_API_KEY}`;
  const videoFetchUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&maxResults=10&order=date&key=${process.env.YOUTUBE_API_KEY}`;
  const channelData = await axios.get(channelFetchUrl);
  const videoData = await axios.get(videoFetchUrl);
  console.log(videoData.data);
  const requiredData = {
    id: channelData.data.items[0].id,
    title: channelData.data.items[0].snippet.title,
    description: channelData.data.items[0].snippet.description,
    avatar: channelData.data.items[0].snippet.thumbnails.default.url,
    banner: channelData.data.items[0].brandingSettings.image.bannerExternalUrl,
    subscriberCount: channelData.data.items[0].statistics.subscriberCount,
    videoCount: channelData.data.items[0].statistics.videoCount,
    viewCount: channelData.data.items[0].statistics.viewCount,
    videos: videoData.data.items,
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
