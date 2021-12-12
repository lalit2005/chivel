import { BsTrash } from 'react-icons/bs';
import { useState } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { useRouter } from 'next/router';
import Modal from '@/common/Modal';
import supabase from 'libs/supabase';
import toast from 'react-hot-toast';

const Setup = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [deleteModal, setDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    const { data: channel, error: channelError } = await supabase
      .from('channels')
      .select('id')
      .eq('id', id)
      .single();
    console.log(channel);
    const { data, error } = await supabase
      .from('channels')
      .delete()
      .match({ id: id })
      .single();
    if (data) {
      router.push('/dashboard');
      toast.success(`Successfully deleted ${data?.channel_name}`);
    } else {
      toast.error('Not deleted');
    }
    setLoading(false);
    setDeleteModal(false);
  };
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
        title='Are you sure?'
        isOpen={deleteModal}
        setIsOpen={setDeleteModal}>
        <p>This can&apos;t be undone</p>
        <button
          className={
            'px-4 bg-red-500 mt-4 py-2 rounded hover:bg-red-700 ' +
            (loading ? 'opacity-50 cursor-not-allowed' : '')
          }
          onClick={onDelete}>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </Modal>
    </DashboardLayout>
  );
};

export default Setup;
