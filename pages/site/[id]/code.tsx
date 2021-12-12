import DashboardLayout from '@/layouts/DashboardLayout';
import Button from '@/ui/Button';
import { useEffect, useState } from 'react';
import FormGroup from '@/common/FormGroup';
import { useFormik } from 'formik';
import supabase from 'libs/supabase';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

const Setup = () => {
  const router = useRouter();
  const { id } = router.query;
  const [site, setSite] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('channels')
      .select('custom_css,custom_head')
      .eq('id', id)
      .single();
    if (data) {
      formik.setValues({
        style: data.custom_css,
        head: data.custom_head,
      });
    }
  };
  const formik = useFormik({
    initialValues: {
      style: '',
      head: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      const { data, error } = await supabase.from('channels').update({
        custom_css: values.style,
        custom_head: values.head,
      });
      if (data) {
        toast.success('Updated');
      } else {
        console.log(error);
        toast.error('Error occured');
      }

      setLoading(false);
    },
  });
  return (
    <DashboardLayout
      heading='Snippet Injection'
      description='Add dynamic **script tags** and **styles** to your site such as analytics.'
      page='snippet'>
      <form onSubmit={formik.handleSubmit}>
        <Button loading={loading} classname='mb-10' type='submit'>
          Save
        </Button>
        <div>
          <div>
            <h2 className='font-mono'>{'<style>'}</h2>

            <FormGroup
              formik={formik}
              isTextarea={true}
              className='font-mono bg-black rounded-md my-3 block w-full'
              id='style'
              placeholder='Type your styles here'></FormGroup>

            <h2 className='font-mono'>{'</style>'}</h2>
          </div>
          <div className='mt-10'>
            <h2 className='font-mono'>{'<head>'}</h2>

            <FormGroup
              formik={formik}
              id='head'
              isTextarea={true}
              className='font-mono bg-black rounded-md my-3 block w-full'
              placeholder='Type HTML tags that go into head of the website such analytics, etc.. '
            />

            <h2 className='font-mono'>{'</head>'}</h2>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default Setup;
