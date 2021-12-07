import AppLayout from "@/layouts/AppLayout";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <AppLayout>
      <div className="pt-32 text-6xl font-black text-center font-cal">
        <h1>
          Create a stunning landing page <br /> for your Youtube channel
        </h1>
        <span className="text-transparent opacity-80 bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-300 to-blue-500">
          in seconds.
        </span>
      </div>
      <div className="mt-20">
        <div className="grid items-start justify-center gap-8">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg opacity-75 group-hover:opacity-100 transition filter blur-2xl duration-1000 group-hover:duration-200 animate-tilt"></div>
            <button className="px-12 py-4 text-2xl font-bold text-white transition-all duration-150 transform bg-gray-800 border border-gray-600 rounded font-cal hover:scale-105">
              Get Started <span className="ml-2 ">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
