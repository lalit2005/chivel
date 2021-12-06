import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen text-white bg-black">
      <nav className="flex items-center justify-between max-w-4xl px-5 py-4 mx-auto text-gray-300 hover:text-gray-50 sm:px-0">
        <p className="text-2xl font-bold text-white font-cal">CHIVEL</p>
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
    </div>
  );
};

export default Home;
