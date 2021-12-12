import { BsTrash } from 'react-icons/bs';
import DashboardLayout from '@/layouts/DashboardLayout';

const Setup = () => {
  return (
    <DashboardLayout
      heading='Settings'
      description="Just visit this if you don't want your site anymore."
      page='settings'>
      <button className='px-4 bg-red-500 py-2 rounded hover:bg-red-700'>
        <BsTrash className='inline-block font-bold relative -top-px' /> Delete
        this site
      </button>
    </DashboardLayout>
  );
};

export default Setup;
