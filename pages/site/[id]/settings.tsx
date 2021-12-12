import { BsTrash } from 'react-icons/bs';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useRouter } from 'next/router';
import Modal from '@/common/Modal';
import { useState } from 'react';

const Setup = () => {
  const router = useRouter();
  const { id } = router.query;
  const [deleteModal, setDeleteModal] = useState(false);
  return (
    <DashboardLayout
      heading='Settings'
      description="Just visit this if you don't want your site anymore."
      page='settings'>
      <button
        onClick={() => setDeleteModal(true)}
        className='px-4 bg-red-500 py-2 rounded hover:bg-red-700'>
        <BsTrash className='inline-block font-bold relative -top-px' /> Delete
        this site
      </button>
      <Modal
        title='Are you sure? This cannot be undone!'
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}>
        Hello
      </Modal>
    </DashboardLayout>
  );
};

export default Setup;
