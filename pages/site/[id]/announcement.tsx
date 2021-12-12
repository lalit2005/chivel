import DashboardLayout from '@/layouts/DashboardLayout';
import { useState } from 'react';

const Setup = () => {
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  return (
    <DashboardLayout
      heading='Announcements'
      description="Want to add a **banner** at the top of your site? Here's the place to do it."
      page='announcement'>
      <form>
        <label className='text-gray-400 mb-2 block' htmlFor='announcement-text'>
          Text that has to be displayed
        </label>
        <input
          type='text'
          id='announcement-text'
          value={text}
          required
          onChange={(e) => setText(e.target.value)}
          placeholder='Become a javascript hero with my latest course'
          className='input w-full block'
        />
        <label className='text-gray-400 mt-8 mb-2 block' htmlFor='link'>
          Link the user should be taken to when the announcement <br /> banner
          is clicked
        </label>
        <input
          type='url'
          id='link'
          value={link}
          required
          onChange={(e) => setLink(e.target.value)}
          placeholder='Link'
          className='input w-full block'
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            // TODO: Add announcement to database
            console.log(text, link);
          }}
          className='bg-green-600 text-white px-4 py-2 mt-8 rounded-sm hover:bg-green-700'
          type='submit'>
          Save
        </button>
      </form>
    </DashboardLayout>
  );
};

export default Setup;
