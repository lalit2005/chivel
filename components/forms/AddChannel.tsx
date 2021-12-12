import FormGroup from '@/common/FormGroup';
import Button from '@/ui/Button';
import { useUser } from '@/utils/contexts/useUser';
import axios from 'axios';
import { useFormik } from 'formik';
import supabase from 'libs/supabase';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

type currentFormType = 'channelId' | 'channelDetail';

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

const AddChannel = ({ setIsOpen }: Props) => {
  const [currentForm, setCurrentForm] = useState<currentFormType>('channelId');
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const firstStepFormFormik = useFormik({
    initialValues: {
      channelId: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      let { data, error, status } = await supabase
        .from('channels')
        .select('*')
        .eq('channel_id', values.channelId)
        .single();
      if (!data) {
        await axios
          .get('/api/yt-api?id=' + values.channelId)
          .then((res) => {
            setCurrentForm('channelDetail');
            secondStepFormFormik.setValues({
              channelName: res.data.title,
              channelDescription: res.data.description,
              subdomain: res.data.title.toLowerCase().replaceAll(' ', '-'),
            });
          })
          .catch((err) => {
            firstStepFormFormik.setErrors({
              channelId: 'Make sure you entered a valid channel id',
            });
          });
      } else {
        firstStepFormFormik.setErrors({
          channelId: 'Channel Already Exists',
        });
      }
      setIsLoading(false);
    },
    validationSchema: Yup.object({
      channelId: Yup.string().required('Channel ID is required'),
    }),
  });

  const secondStepFormFormik = useFormik({
    initialValues: {
      channelName: '',
      channelDescription: '',
      subdomain: '',
    },
    onSubmit: async (values) => {
      console.log('Submitted');
      setIsLoading(true);
      let { data, error, status } = await supabase
        .from('channels')
        .select('*')
        .eq('subdomain', values.subdomain)
        .single();
      if (data) {
        secondStepFormFormik.setErrors({
          subdomain: 'Subdomain Already Exists',
        });
      } else {
        let { data, error, status } = await supabase
          .from('channels')
          .insert({
            channel_id: firstStepFormFormik.values.channelId,
            channel_name: values.channelName,
            channel_description: values.channelDescription,
            subdomain: values.subdomain,
            created_by: user.id,
            navbarLinks: [
              `Youtube||https://youtube.com/channel/${firstStepFormFormik.values.channelId}`,
            ],
          })
          .single();
        if (data) {
          router.push('/site/' + data.id + '/settings');
          toast.success('Channel Added');
        } else {
          console.log(error);
          toast.error('Channel Not Added');
        }
      }
      setIsOpen(false);
      setIsLoading(false);
    },
    validationSchema: Yup.object({
      channelName: Yup.string().required('Channel Name is required'),
      channelDescription: Yup.string().required(
        'Channel Description is required'
      ),
    }),
  });

  return (
    <div>
      <form
        onSubmit={firstStepFormFormik.handleSubmit}
        className={currentForm !== 'channelId' ? 'hidden' : 'block'}>
        <FormGroup
          formik={firstStepFormFormik}
          id='channelId'
          className='input'
          label='Channel ID'
          type='text'
          helperText={
            <>
              <p className='text-gray-500 my-3'>
                Don&apos;t know your channel id? Get it from{' '}
                <a
                  className='text-blue-500 hover:underline'
                  href='https://www.youtube.com/account_advanced'>
                  here
                </a>
              </p>
            </>
          }
        />
        <Button loading={isLoading} type='submit'>
          Add Channel
        </Button>
      </form>
      {/* Second Step Form */}
      <form
        onSubmit={secondStepFormFormik.handleSubmit}
        className={currentForm !== 'channelDetail' ? 'hidden' : 'block'}>
        <div className='flex flex-col gap-4'>
          <FormGroup
            label='Channel Name'
            formik={secondStepFormFormik}
            type='text'
            className='input'
            id='channelName'
          />
          <p className='flex'>
            <div className='flex-1 w-full'>
              <FormGroup
                label='Subdomain'
                className='input'
                formik={secondStepFormFormik}
                type='text'
                id='subdomain'
              />
            </div>
            <span className='self-end pl-3 relative -top-2'>.chivel.tk</span>
          </p>
          <FormGroup
            label='Channel Description'
            formik={secondStepFormFormik}
            isTextarea={true}
            className='input'
            id='channelDescription'
          />
        </div>
        <Button loading={isLoading} type='submit'>
          Add Channel
        </Button>
      </form>
    </div>
  );
};

export default AddChannel;
