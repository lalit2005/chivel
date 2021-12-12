import TwitterPreview from '@/common/TwitterPreview';
import DashboardLayout from '@/layouts/DashboardLayout';
import uploadImage from '@/utils/upload-image';
import { useRouter } from 'next/router';
import Dropzone from 'react-dropzone';
import { BiCloudUpload } from 'react-icons/bi';

const Analytics = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <DashboardLayout
      page='seo'
      heading='SEO'
      description='Make your website stand out in social media when shared.'>
      <h2 className='text-lg text-gray-400 font-semibold mb-5'>
        This is how your site will look like when shared on Twitter
      </h2>
      <TwitterPreview
        ogImageUrl='https://www.pagely.site/ogimage.png'
        desc='Channel description'
        title='My channel'
        subdomain='channel'
      />

      <Dropzone
        onDrop={(files) => {
          uploadImage(files, id);
        }}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input type='file' {...getInputProps()} />
            <BiCloudUpload className='relative inline-block w-5 h-5 bottom-px' />{' '}
            Upload image
          </div>
        )}
      </Dropzone>
    </DashboardLayout>
  );
};

export default Analytics;
