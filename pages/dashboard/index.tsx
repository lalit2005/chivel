import { useUser } from '@/utils/contexts/useUser';
import withPageAuthRequired from '@/utils/withPageAuthRequired';
import ProfileDropdown from '@/common/ProfileDropdown';

const Page = () => {
  const { isLoading, user } = useUser();
  const { email } = user;
  console.log(isLoading, user);

  return (
    <div className='min-h-screen text-white bg-black'>
      Dashboard {email}
      <ProfileDropdown />
      <main>
        <input className='text-black' type='text' />
        <button>New site</button>
        <div></div>
      </main>
    </div>
  );
};

export default withPageAuthRequired(Page);
