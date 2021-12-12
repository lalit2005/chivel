import FormGroup from '@/common/FormGroup';
import DashboardLayout from '@/layouts/DashboardLayout';
import Button from '@/ui/Button';
import { useFormik } from 'formik';
import supabase from 'libs/supabase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const Setup = () => {
  const router = useRouter();
  const { id } = router.query;
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('channels')
      .select('announcement_url,announcement_text')
      .eq('id', id)
      .single();
    if (data) {
      formik.setValues({
        link: data.announcement_url,
        text: data.announcement_text,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      text: '',
      link: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      const { data, error } = await supabase
        .from('channels')
        .update({
          announcement_text: values.text,
          announcement_url: values.link,
        })
        .match({ id });
      if (data) {
        toast.success('Announcement updated successfully');
      } else {
        console.log(error);
        toast.error('Announcement update failed');
      }
      setLoading(false);
    },
    validationSchema: Yup.object({
      text: Yup.string(),
      link: Yup.string(),
    }),
  });
  return (
    <DashboardLayout
      heading='Announcements'
      description="Want to add a **banner** at the top of your site? Here's the place to do it."
      page='announcement'>
      <form onSubmit={formik.handleSubmit}>
        <FormGroup
          id='text'
          type='text'
          className='input'
          formik={formik}
          label=' Text that has to be displayed'
          placeholder='Become a javascript hero with my latest course'
        />
        <div className='mt-10'>
          <FormGroup
            id='link'
            type='text'
            className='input'
            formik={formik}
            label={
              'Link the user should be taken to when the announcement banner is clicked'
            }
            placeholder='https://www.udemy.com/course/javascript-the-complete-guide-2020-edition/'
          />
        </div>
        <Button loading={loading} className='mt-10' type='submit'>
          Save
        </Button>
      </form>
    </DashboardLayout>
  );
};

export default Setup;
