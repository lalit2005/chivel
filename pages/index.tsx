import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="min-h-screen text-white bg-black">
      {/* <nav className="max-w-2xl py-4 mx-auto text-gray-300 hover:text-gray-50">
        <ul className="flex items-center justify-between">
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
      </nav> */}
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
