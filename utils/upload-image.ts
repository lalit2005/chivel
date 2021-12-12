import supabase from 'libs/supabase';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';

// @ts-ignore
const uploadImage = async (files, id) => {
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

  const filename = `${nanoid()}.${file.type.split('/')[1]}`;

  // if the file is valid, upload it to supabase storage
  const { data, error } = await supabase.storage
    .from('og-images')
    .upload(filename, file);
  if (data) {
    const { data: dbData, error: dbError } = await supabase
      .from('channels')
      .update({
        og_image_url: supabase.storage.from('og-images').getPublicUrl(data.Key),
      });
    return supabase.storage.from('og-images').getPublicUrl(data.Key);
  }
  toast.error('Error occured');
  return;
};

export default uploadImage;
