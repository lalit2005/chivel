import Link from 'next/link';
import { BiCode, BiNavigation } from 'react-icons/bi';
import { FiSettings, FiInbox } from 'react-icons/fi';
import { VscGraphLine } from 'react-icons/vsc';
import { HiOutlineSpeakerphone } from 'react-icons/hi';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';

const DashboardLayout: React.FC<{
  heading: string;
  description: string;
  page: 'setup' | 'seo' | 'navbar' | 'settings' | 'snippet' | 'announcement';
}> = ({ page, heading, description, ...props }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className='flex text-white bg-black'>
      <div className='w-1/5 h-screen px-8 pt-24 border-r border-gray-800'>
        <div className='space-y-4'>
          <Link href={`/site/${id}/setup`}>
            <a
              className={clsx(
                'block w-full px-4 py-2 text-gray-300 rounded hover:bg-gray-900 hover:text-gray-50',
                page === 'setup' && 'bg-gray-900 text-gray-50 font-bold'
              )}>
              <FiInbox className='relative inline-block mr-3 bottom-px' />
              Setup
            </a>
          </Link>
          <Link href={`/site/${id}/code`}>
            <a
              className={clsx(
                'block w-full px-4 py-2 text-gray-300 rounded hover:bg-gray-900 hover:text-gray-50',
                page === 'snippet' && 'bg-gray-900 text-gray-50 font-bold'
              )}>
              <BiCode className='relative inline-block mr-3 bottom-px' />
              Snippet Injection
            </a>
          </Link>
          <Link href={`/site/${id}/navbar`}>
            <a
              className={clsx(
                'block w-full px-4 py-2 text-gray-300 rounded hover:bg-gray-900 hover:text-gray-50',
                page === 'navbar' && 'bg-gray-900 text-gray-50 font-bold'
              )}>
              <BiNavigation className='relative inline-block mr-3 bottom-px' />
              Navbar
            </a>
          </Link>
          <Link href={`/site/${id}/announcement`}>
            <a
              className={clsx(
                'block w-full px-4 py-2 text-gray-300 rounded hover:bg-gray-900 hover:text-gray-50',
                page === 'announcement' && 'bg-gray-900 text-gray-50 font-bold'
              )}>
              <HiOutlineSpeakerphone className='relative inline-block mr-3 bottom-px' />
              Announcement
            </a>
          </Link>
          <Link href={`/site/${id}/seo`}>
            <a
              className={clsx(
                'block w-full px-4 py-2 text-gray-300 rounded hover:bg-gray-900 hover:text-gray-50',
                page === 'seo' && 'bg-gray-900 text-gray-50 font-bold'
              )}>
              <VscGraphLine className='relative inline-block mr-3 bottom-px' />
              SEO
            </a>
          </Link>
          <Link href={`/site/${id}/settings`}>
            <a
              className={clsx(
                'block w-full px-4 py-2 text-gray-300 rounded hover:bg-gray-900 hover:text-gray-50',
                page === 'settings' && 'bg-gray-900 text-gray-50 font-bold'
              )}>
              <FiSettings className='relative inline-block mr-3 bottom-px' />
              Settings
            </a>
          </Link>
        </div>
      </div>
      <div className='pt-24 pl-20'>
        <h1 className='text-4xl font-extrabold font-cal'>{heading}</h1>
        <p className='mt-5 text-gray-300 mb-14 desc'>
          <ReactMarkdown>{description}</ReactMarkdown>
        </p>
        {props.children}
      </div>
      <style>{`
			.desc a {
				text-decoration: underline;
			}
			.desc a:hover {
				background-color: lightgray;
				color: black;
			}
			`}</style>
    </div>
  );
};

export default DashboardLayout;
