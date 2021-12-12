import Modal from '@/common/Modal';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useState } from 'react';

const Setup = () => {
  const [deleteModal, setDeleteModal] = useState(true);
  return (
    <DashboardLayout
      heading='Snippet Injection'
      description="Add dynamic script tags to your site's head or body."
      page='snippet'>
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
