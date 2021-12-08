import AppLayout from "layouts/AppLayout";
import { NextPage } from "next";
import { ImGithub, ImGoogle, ImTwitter } from "react-icons/im";

const LoginPage: NextPage = () => {
  return (
    <AppLayout>
      <div>
        <h1 className="mt-20 text-5xl font-extrabold text-center font-cal">
          WELCOME BACK 👋
        </h1>
        <div className="mt-20 text-lg">
          <button
            className="block px-10 py-2 mx-auto my-5 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
            type="button">
            <ImGoogle className="relative inline-block mr-3 bottom-px" />
            Sign in with Google
          </button>
          <button
            className="block px-10 py-2 mx-auto my-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            type="button">
            <ImTwitter className="relative inline-block mr-3 bottom-px" /> Sign
            in with Twitter
          </button>
          <button
            className="block px-10 py-2 mx-auto my-5 font-bold text-black bg-white rounded hover:bg-gray-100 focus:outline-none focus:shadow-outline"
            type="button">
            <ImGithub className="relative inline-block mr-3 bottom-px" />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default LoginPage;
