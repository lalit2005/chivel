import supabase from 'libs/supabase';
import toast from 'react-hot-toast';

// @ts-ignore
const uploadImage = async (files) => {
  const file = files[0];

  // if the file is is not an png, jpg or jpeg, reject it
  if (!file.type.match(/^image\/(png|jpe?g)$/)) {
    toast.error('Only png, jpg and jpeg images are allowed!');
    return;
  }

  // if the file is too big, reject it
  if (file.size > 10 * 1024 * 1024) {
    toast.error('The image is too big!');
    return;
  }

  // if the file is valid, upload it to supabase storage
  const { data, error } = await supabase.storage
    .from('og-images')
    .upload('ogimages', file);
  console.log(data, error);
};

export default uploadImage;
