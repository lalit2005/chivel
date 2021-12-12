import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import truncate from 'lodash.truncate';

const YoutubeVideo: React.FC<{
  imageUrl: string;
  videoUrl: string;
  title: string;
}> = ({ imageUrl, videoUrl, title }) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoUrl}`;

  return (
    <div className='mx-auto mb-4'>
      <div
        onClick={openModal}
        className='relative mx-auto group cursor-pointer'>
        <p className='absolute top-0 left-0 z-10 px-1 mt-1 ml-1 bg-black rounded shadow-lg opacity-0 group-hover:opacity-100'>
          {truncate(title, { length: 50 })}
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt={title}
          loading='lazy'
          className='z-0 transform rounded-md group-hover:scale-105 opacity-70 hover:opacity-90'
        />
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}>
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'>
              <Dialog.Overlay className='fixed inset-0 backdrop-blur-lg backdrop-filter' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <div className='inline-block text-left align-middle transition-all transform bg-white rounded-md shadow-xl'>
                <iframe
                  src={embedUrl}
                  frameBorder='0'
                  width={800}
                  height={450}
                  className='rounded-lg'></iframe>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default YoutubeVideo;
