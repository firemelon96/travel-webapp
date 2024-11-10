import { getTourById } from '@/lib/tour';
import { ImageBanner } from '../../components/image-banner';

const DynamicPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const tour = await getTourById(id);
  return (
    <main className='container mx-auto'>
      <div className='space-y-4'>
        <h1 className='text-2xl font-semibold'>{tour?.title}</h1>
        <div className='flex justify-between'>
          <p>Reviews</p>
          <span>Add to wishlist</span>
        </div>
        <ImageBanner images={tour?.images} />
        <p>{tour?.description}</p>
      </div>
    </main>
  );
};

export default DynamicPage;
