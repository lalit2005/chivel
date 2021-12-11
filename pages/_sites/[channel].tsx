import axios from 'axios';
import { url } from 'inspector';
import { GetStaticPaths, GetStaticProps } from 'next';

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
      <div className='flex flex-col min-h-screen justify-between w-full max-w-4xl py-6 mx-auto sm:px-0'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <nav className='container mx-auto flex items-center justify-between px-4 md:px-6'>
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
        <main className='mt-32'>
          <div className='text-center'>
            <div className='relative'>
              <div className='absolute max-w-xl mx-auto -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-50 transition filter blur-2xl duration-1000 animate-tilt'></div>
              <h1 className='font-extrabold capitalize text-7xl'>
                {data.title}
              </h1>
            </div>
            <p className='mt-8 text-lg text-gray-400 max-w-2xl px-4 md:px-6 mx-auto'>
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

      <section
        className='py-20 bg-red-500 text-2xl bg-no-repeat bg-cover bg-center relative'
        style={{ backgroundImage: `url(${data.banner})` }}>
        <div className='flex text-center md:text-left gap-6 md:gap-0 md:flex-row flex-col items-center justify-between w-full max-w-4xl mx-auto'>
          <div>
            <p className='text-5xl font-bold font-cal'>21k</p>
            <h3 className='font-extrabold text-black uppercase'>Subscribers</h3>
          </div>
          <div>
            <p className='text-5xl font-bold font-cal'>122</p>
            <h3 className='font-extrabold text-black uppercase'>Videos</h3>
          </div>
          <div>
            <p className='text-5xl font-bold font-cal'>2244k</p>
            <h3 className='font-extrabold text-black uppercase'>Views</h3>
          </div>
        </div>
      </section>
      <div className=''></div>
      <section></section>
    </div>
  );
};

export default Page;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await axios.get(
    'http://localhost:3000/api/get-youtube?id=UCsBjURrPoezykLs9EqgamOA'
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
