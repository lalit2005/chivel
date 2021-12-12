import { useUser } from '@/utils/contexts/useUser';
import withPageAuthRequired from '@/utils/withPageAuthRequired';
import Navbar from 'components/pages/dashboard/Navbar';
import Link from 'next/link';
import Modal from '@/common/Modal';
import { Suspense, useEffect, useState } from 'react';
import AddChannel from 'components/forms/AddChannel';
import supabase from 'libs/supabase';
import { Channel } from '@/utils/types';
import ChannelCard from '@/common/ChannelCard';

const Page = () => {
  const { isLoading, user } = useUser();
  const { email, user_metadata } = user;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isChannelLoading, setIsChannelLoading] = useState(false);

  const [channels, setChannels] = useState<Channel[] | null>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPosts();
  }, []);
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .eq('created_by', user.id)
      .order('created_at', { ascending: false });
    setChannels(data);
    setLoading(false);
  }
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
            {channels &&
              channels?.length > 0 &&
              channels.map((channel) => (
                <ChannelCard channel={channel} key={channel.id} />
              ))}
            {loading && <div>Loading...</div>}
            {!channels?.length && !loading && <div>No channels found</div>}
          </div>
        </main>
      </div>
      <Modal
        title='Add a channel'
        isOpen={isCreateModalOpen}
        setIsOpen={setIsCreateModalOpen}>
        <AddChannel setIsOpen={setIsCreateModalOpen} />
      </Modal>
    </div>
  );
};

export default withPageAuthRequired(Page);
