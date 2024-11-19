'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import { toast } from 'sonner';

type Props = {
  onChange: (urls: string[]) => void;
};

export const ImageUpload = ({ onChange }: Props) => {
  // const [imageUrls, setImageUrls] = useState('');

  const handleUploadComplete = (images: { url: string }[]) => {
    const urls = images.map((image) => image.url);
    onChange(urls); // Send URLs back to the parent
  };

  return (
    <main className='flex border flex-col items-center justify-between'>
      <UploadDropzone
        className='w-full p-2'
        endpoint='imageUploader'
        onClientUploadComplete={(images) => {
          handleUploadComplete(images || []);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          console.log(error);
          toast.error('File size too large, or maximum upload exceeds');
        }}
      />
    </main>
  );
};
