import DashboardLayout from '@/layouts/DashboardLayout';
import { Channel } from '@/utils/types';
import supabase from 'libs/supabase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Setup = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('Loading...');
  const [channelData, setChannelData] = useState<Channel>();

  const fetchData = async () => {
    // @ts-ignore
    const { data, error }: { data: Channel } = await supabase
      .from('channels')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      console.log(error);
      return;
    }
    setChannelData(data);
    setTitle(data.channel_name);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout
      heading={title}
      description="Manage your channel's website easily from Chivel's dashboard."
      page='setup'>
      <div className='text-lg'>
        <p>
          <a
            href={`https://youtube.com/channel/${channelData?.channel_id}`}
            rel='noopener noreferrer'
            target='_blank'
            className='px-5 py-2 rounded my-4 block bg-gray-100 text-black hover:bg-blue-400'>
            Visit Channel
          </a>
        </p>
        <p>
          <a
            href={`https://${channelData?.subdomain}.chivel.tk`}
            target='_blank'
            rel='noopener noreferrer'
            className='px-5 py-2 rounded my-4 block bg-gray-100 text-black hover:bg-green-400'>
            View Website
          </a>
        </p>
        <p>
          <a
            href={`https://developers.google.com/speed/pagespeed/insights/?url=https://${channelData?.subdomain}.chivel.tk`}
            rel='noopener noreferrer'
            target='_blank'
            className='px-5 py-2 rounded my-4 block bg-gray-100 text-black hover:bg-red-400'>
            View Website&apos;s lighthouse score
          </a>
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Setup;
