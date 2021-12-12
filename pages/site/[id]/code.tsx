import DashboardLayout from '@/layouts/DashboardLayout';
import Button from '@/ui/Button';
import { useState } from 'react';

const Setup = () => {
  const [style, setStyle] = useState('');
  const [head, setHead] = useState('');
  return (
    <DashboardLayout
      heading='Snippet Injection'
      description='Add dynamic **script tags** and **styles** to your site such as analytics.'
      page='snippet'>
      <Button
        className='mb-10'
        onClick={() => {
          // Todo: Save to database
          console.log({ style, head });
        }}>
        Save
      </Button>
      <div>
        <div>
          <h2 className='font-mono'>{'<style>'}</h2>

          <textarea
            className='font-mono bg-black rounded-md my-3 block w-full'
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            placeholder='Type your styles here'
            autoFocus
            cols={50}
            rows={10}></textarea>

          <h2 className='font-mono'>{'</style>'}</h2>
        </div>
        <div className='mt-10'>
          <h2 className='font-mono'>{'<head>'}</h2>

          <textarea
            className='font-mono bg-black rounded-md my-3 block w-full'
            value={head}
            onChange={(e) => setHead(e.target.value)}
            placeholder='Type HTML tags that go into head of the website such analytics, etc.. '
            autoFocus
            cols={50}
            rows={10}></textarea>

          <h2 className='font-mono'>{'</head>'}</h2>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Setup;
