import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen text-white bg-black">
      <nav className="flex items-center justify-between max-w-4xl px-5 py-4 mx-auto text-gray-300 hover:text-gray-50 sm:px-0">
        <p className="text-2xl font-bold text-white select-none font-cal">
          CHIVEL
        </p>
        <ul className="flex items-center justify-between space-x-10">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Showcase</Link>
          </li>
          <li>
            <Link href="/">Support</Link>
          </li>
        </ul>
      </nav>
      <div className="pt-32 text-6xl font-black text-center font-cal">
        <h1>Make landing pages for your mobile apps</h1>
        <span className="text-transparent opacity-80 bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-300 to-blue-500">
          in seconds.
        </span>
      </div>
      <div className="mt-20">
        <div className="grid items-start justify-center gap-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <button className="px-12 py-4 text-2xl font-bold text-white transition-all duration-150 transform bg-gray-800 border border-gray-600 rounded backdrop-filter backdrop-blur-xl font-cal hover:scale-105">
              Get Started <span className="ml-2 ">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
