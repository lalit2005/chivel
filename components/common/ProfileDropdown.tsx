import { Menu, Transition } from '@headlessui/react';
import { useUser } from '@/utils/contexts/useUser';
import Link from 'next/link';

function ProfileDropdown() {
  const {
    user: { email, user_metadata },
    signOut,
  } = useUser();

  return (
    <Menu as='div' className='relative'>
      <Menu.Button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={user_metadata.avatar_url}
          alt={email}
          width={50}
          height={50}
          className='rounded-full'
        />
      </Menu.Button>
      <Transition
        enter='transition duration-100 ease-out'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'>
        <Menu.Items className='absolute bg-black   top-full right-0 z-50 inline-block px-5 py-6 space-y-3 text-gray-300 border border-gray-600 rounded-sm shadow-xl'>
          <Menu.Item>
            <div className='pb-2 mb-2 text-sm border-b border-gray-600'>
              Signed in as
              <p className='text-base'>
                <span>{email}</span>
              </p>
            </div>
          </Menu.Item>
          <Menu.Item>
            <Link href='/support'>
              <a className='block hover:text-gray-100'>Support</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href='/showcase'>
              <a className='block hover:text-gray-100'>Showcase</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href='/guide'>
              <a className='block hover:text-gray-100'>Guide</a>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <button
              onClick={signOut}
              className='w-full px-3 py-2 mt-3 border border-gray-700 rounded hover:border-gray-500'>
              Logout
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ProfileDropdown;
