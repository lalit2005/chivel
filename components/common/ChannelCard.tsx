import { Channel } from '@/utils/types';
import Link from 'next/link';
interface Props {
  channel: Channel;
}
const ChannelCard = ({ channel }: Props) => {
  return (
    <div>
      <Link href='#'>
        <a>
          <div className='w-full max-w-sm px-5 py-3 border border-gray-700 rounded group hover:scale-105 transform transition-all'>
            <h3 className='mt-3 mb-4 text-2xl font-bold text-gray-400 group-hover:text-gray-100'>
              {channel.channel_name}
            </h3>
            <p className='mb-3 text-gray-500 group-hover:text-gray-400'>
              <a
                href={`https://youtube.com/channel/${channel.channel_id}`}>{`https://youtube.com/channel/${channel.channel_id}`}</a>
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ChannelCard;
