import axios from 'axios';
import { channel } from 'diagnostics_channel';
import { GetStaticPaths, GetStaticProps } from 'next';
import useSWR from 'swr';

// @ts-ignore
const Page = ({ data }) => {
  console.log(data);
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
    <div className='w-screen min-h-screen text-white bg-black'>
      <div className='flex justify-between w-full max-w-4xl px-4 py-6 mx-auto sm:px-0'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={data.avatar} width='50' height='50' alt={data.title} />
        <nav className='flex items-center justify-between space-x-6'>
          {navLinks.map((navLink) => {
            return (
              <a
                href={navLink.href}
                key={navLink.text}
                className='opacity-75 hover:opacity-100'>
                {navLink.text}
              </a>
            );
          })}
        </nav>
      </div>
      <main className='mt-36'>
        <div className='text-center'>
          <div className='relative'>
            <div className='absolute max-w-xl mx-auto -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-50 transition filter blur-2xl duration-1000 animate-tilt'></div>
            <h1 className='font-extrabold capitalize text-7xl'>{data.title}</h1>
          </div>
          <p className='mt-8 text-lg text-gray-400 max-w-2xl mx-auto'>
            {data.description}
          </p>
          <div className='mt-32'>
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
      {/* <section className='py-10 mt-20 bg-red-500'>
        <div className='flex items-center justify-between w-full max-w-4xl mx-auto'>
          <div>
            <p>21k</p>
            <h3>Subscribers</h3>
          </div>
          <div>
            <p>122</p>
            <h3>Videos</h3>
          </div>
          <div>
            <p>2244k</p>
            <h3>Views</h3>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await axios.get(
    'http://localhost:3000/api/get-youtube?id=UC_x5XG1OV2P6uZZ5FSM9Ttw'
  );
  return {
    props: {
      data: res.data.data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
