import DashboardLayout from '@/layouts/DashboardLayout';
import supabase from 'libs/supabase';
import { useRouter } from 'next/router';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Setup = () => {
  const router = useRouter();
  const { id } = router.query;
  const [navLinks, setNavLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    const { data, error } = await supabase
      .from('channels')
      .select('navbarLinks')
      .eq('id', id)
      .single();
    if (data) {
      setNavLinks(data.navbarLinks);
    } else {
      console.log(error);
    }
    setLoading(false);
  };

  const onSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('channels')
      .update({ navbarLinks: navLinks })
      .match({ id });

    console.log(data);

    if (data) {
      toast.success('Links Updated');
    } else {
      console.log(error);
      toast.error('Error occured');
    }
  };

  useEffect(() => {
    console.log(navLinks);
  }, [navLinks]);
  return (
    <DashboardLayout
      heading='Navbar'
      description='Edit the links in the navbar of your site. You should be adding them because [it matters](https://www.readyartwork.com/5-reasons-navigation-important/). A lot.'
      page='navbar'>
      <form onSubmit={onSubmit}>
        {loading && <div>Loading...</div>}
        {!loading && !navLinks && <div>No links added</div>}
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
            className='bg-green-500 hover:bg-green-700 text-white w-full py-2 rounded mt-4'
            type='submit'>
            Save
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default Setup;
