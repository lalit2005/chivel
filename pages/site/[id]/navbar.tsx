import DashboardLayout from '@/layouts/DashboardLayout';
import { useState } from 'react';

const Setup = () => {
  const [navLinks, setNavLinks] = useState([
    'Google||https://google.com',
    'Facebook||https://facebook.com',
    'Twitter||https://twitter.com',
    'Instagram||https://instagram.com',
    'Youtube||https://youtube.com',
  ]);
  return (
    <DashboardLayout
      heading='Navbar'
      description='Edit the links in the navbar of your site. You should be adding them because [it matters](https://www.readyartwork.com/5-reasons-navigation-important/). A lot.'
      page='navbar'>
      <form>
        {navLinks.map((link, index) => {
          const [text, url] = link.split('||');
          return (
            <div className='my-4 border-b border-gray-900' key={index}>
              <input
                type='text'
                className='input mr-2'
                placeholder='Text'
                required
                value={text}
                onChange={(e) => {
                  const newLinks = [...navLinks];
                  newLinks[index] = `${e.target.value}||${url}`;
                  setNavLinks(newLinks);
                }}
              />
              <input
                type='url'
                value={url}
                className='input'
                required
                onChange={(e) => {
                  const newLinks = [...navLinks];
                  newLinks[index] = `${text}||${e.target.value}`;
                  setNavLinks(newLinks);
                }}
                placeholder='Link'
              />
              <button
                onClick={
                  // remove the link
                  () => {
                    const newLinks = [...navLinks];
                    newLinks.splice(index, 1);
                    setNavLinks(newLinks);
                  }
                }
                className='py-2 px-4 rounded border border-gray-700 ml-2 hover:bg-red-600 transition-all'
                type='button'>
                &times;
              </button>
            </div>
          );
        })}
        <div className='max-w-[440px]'>
          <button
            onClick={() => {
              setNavLinks([...navLinks, '||']);
            }}
            className='w-full bg-gray-50 hover:bg-gray-800 text-black hover:text-white py-2 rounded mt-6'>
            Add Link
          </button>
          <button
            className='bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded mt-4'
            type='submit'
            onClick={(e) => {
              e.preventDefault();
              console.log(navLinks);
              // TODO: Save navbar links to database
            }}>
            Save
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default Setup;
