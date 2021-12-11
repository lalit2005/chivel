import FormGroup from '@/common/FormGroup';
import Button from '@/ui/Button';
import axios from 'axios';
import { channel } from 'diagnostics_channel';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { string } from 'yup/lib/locale';

type currentFormType = 'channelId' | 'channelDetail';

const AddChannel = () => {
  const [currentForm, setCurrentForm] = useState<currentFormType>('channelId');
  const [isLoading, setIsLoading] = useState(false);
  const firstStepFormFormik = useFormik({
    initialValues: {
      channelId: '',
    },
    onSubmit: async (values) => {
      setIsLoading(true);
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
    onSubmit: async (values) => {},
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
          label='Channel ID'
          type='text'
          helperText={
            <>
              {' '}
              Don't know your channel id? Get it from{' '}
              <a
                className='text-blue-600'
                href='https://www.youtube.com/account_advanced'>
                here
              </a>
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
            id='channelName'
          />
          <p className='flex'>
            <div className='flex-1 w-full'>
              <FormGroup
                label='Subdomain'
                formik={secondStepFormFormik}
                type='text'
                id='subdomain'
              />
            </div>
            <span className='self-end pl-3'>.chivel.tk</span>
          </p>
          <FormGroup
            label='Channel Description'
            formik={secondStepFormFormik}
            isTextarea={true}
            id='channelDescription'
          />
          <Button loading={isLoading}>Add Channel</Button>
        </div>
      </form>
    </div>
  );
};

export default AddChannel;
