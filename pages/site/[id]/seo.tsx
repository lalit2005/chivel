import TwitterPreview from '@/common/TwitterPreview';
import DashboardLayout from '@/layouts/DashboardLayout';
import uploadImage from '@/utils/upload-image';
import Dropzone from 'react-dropzone';
import { BiCloudUpload } from 'react-icons/bi';

const Analytics = () => {
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

      <div className='my-20 bg-green-600 cursor-pointer px-3 py-1 rounded hover:bg-green-800'>
        <Dropzone
          onDrop={(files) => {
            uploadImage(files);
          }}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}>
              <input type='file' {...getInputProps()} />
              <BiCloudUpload className='relative inline-block mt-30 w-5 h-5 bottom-px' />{' '}
              Upload new OG image for this
            </div>
          )}
        </Dropzone>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
