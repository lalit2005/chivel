import { useUser } from '@/utils/contexts/useUser';
import withPageAuthRequired from '@/utils/withPageAuthRequired';
import ProfileDropdown from '@/common/ProfileDropdown';
import Logo from '@/common/Logo';
import Navbar from 'components/pages/dashboard/Navbar';
import Link from 'next/link';
import Modal from '@/common/Modal';
import { useState } from 'react';
import AddChannel from 'components/forms/AddChannel';

const Page = () => {
  const { isLoading, user } = useUser();
  const { email, user_metadata } = user;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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
              placeholder='Search all your channels'
              type='text'
            />
            <button
              onClick={() => {
                setIsCreateModalOpen(true);
              }}
              className='text-gray-900 w-[20%] rounded-r-sm bg-gray-50 hover:bg-gray-200'>
              New channel
            </button>
          </div>
          <div className='mt-20'>
            <Link href='#'>
              <a>
                <div className='w-full max-w-sm px-5 py-3 border border-gray-700 rounded group'>
                  <h3 className='mt-3 mb-4 text-2xl font-bold text-gray-400 group-hover:text-gray-100'>
                    Fireship
                  </h3>
                  <p className='mb-3 text-gray-500 group-hover:text-gray-400'>
                    https://youtube.com/fireship
                  </p>
                </div>
              </a>
            </Link>
          </div>
        </main>
      </div>
      <Modal
        title='Add a channel'
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}>
        <AddChannel />
      </Modal>
    </div>
  );
};

export default withPageAuthRequired(Page);
