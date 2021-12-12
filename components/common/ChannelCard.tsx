import { Channel } from '@/utils/types';
import Link from 'next/link';
import truncate from 'lodash.truncate';

interface Props {
  channel: Channel;
}
const ChannelCard = ({ channel }: Props) => {
  return (
    <div>
      <Link href={`/site/${channel.id}/setup`}>
        <a>
          <div className='w-full max-w-sm px-5 py-3 border border-gray-700 rounded group hover:scale-105 transform transition-all mb-4'>
            <h3 className='mt-3 mb-4 text-2xl font-bold text-gray-400 group-hover:text-gray-100'>
              {channel.channel_name}
            </h3>
            <p className='mb-3 text-gray-500 group-hover:text-gray-400'>
              {truncate(channel.channel_description, {
                length: 100,
              })}
            </p>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ChannelCard;
