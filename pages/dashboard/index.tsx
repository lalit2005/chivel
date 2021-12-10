import { useUser } from '@/utils/contexts/useUser';
import withPageAuthRequired from '@/utils/withPageAuthRequired';
import ProfileDropdown from '@/common/ProfileDropdown';
import Logo from '@/common/Logo';
import Navbar from 'components/pages/dashboard/Navbar';

const Page = () => {
  const { isLoading, user } = useUser();
  const { email, user_metadata } = user;
  console.log(isLoading, user);
  console.log(user_metadata);
  return (
    <div className='min-h-screen text-white bg-black'>
      <Navbar />
      <div className='w-full max-w-5xl mx-auto'>
        <main className='container px-4 mx-auto mt-7 md:px-8'>
          <h1 className='mb-10 text-5xl font-bold font-cal'>
            {user_metadata.full_name}&apos;s Dashboard
          </h1>
          <div className='flex w-[80%]'>
            <input
              className='w-full bg-gray-800 rounded-l-sm'
              placeholder='Search all your sites'
              type='text'
            />
            <button className='text-gray-900 w-[20%] rounded-r-sm bg-gray-50 hover:bg-gray-200'>
              New site
            </button>
          </div>
          <div>
            {/* <div className='px-4 py-2 border border-gray-700'>
              <h3>Fireship</h3>
              <p>https://youtube.com/fireship</p>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default withPageAuthRequired(Page);
