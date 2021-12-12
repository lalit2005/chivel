import DashboardLayout from '@/layouts/DashboardLayout';

const Setup = () => {
  return (
    <DashboardLayout
      heading='Channel name'
      description="Manage your channel's website easily"
      page='setup'>
      <div className='text-lg'>
        <p>
          <a
            href=''
            target='_blank'
            className='px-5 py-2 rounded my-4 block bg-gray-100 text-black hover:bg-blue-400 hover:animate-pulse'>
            Visit Channel
          </a>
        </p>
        <p>
          <a
            href=''
            target='_blank'
            className='px-5 py-2 rounded my-4 block bg-gray-100 text-black hover:bg-green-400 hover:animate-pulse'>
            View Website
          </a>
        </p>
        <p>
          <a
            href=''
            target='_blank'
            className='px-5 py-2 rounded my-4 block bg-gray-100 text-black hover:bg-red-400 hover:animate-pulse'>
            View Website&apos;s lighthouse score
          </a>
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Setup;
