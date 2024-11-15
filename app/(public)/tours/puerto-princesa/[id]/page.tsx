import { getTourById } from '@/lib/tour';
import { ImageBanner } from '../../components/image-banner';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookingOptions } from '../../components/booking-options';
import Link from 'next/link';

const DynamicPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const tour = await getTourById(id);

  if (!tour) {
    return <div>No data</div>;
  }

  return (
    <main className='container mx-auto'>
      <div className='space-y-4'>
        <h1 className='text-2xl font-semibold'>{tour?.title}</h1>
        <div className='flex justify-between'>
          <p>Reviews</p>
          <span>Add to wishlist</span>
        </div>
        <ImageBanner images={tour?.images} />

        <div className='flex flex-col-reverse md:flex-row gap-2'>
          <div className='flex-1'>
            <p>{tour?.description}</p>
          </div>
          <Card className='md:w-1/3 w-full p-4 h-fit space-y-3'>
            {tour?.prices
              .filter((price) => price.pricingType === 'JOINER')
              .map((price) => (
                <h1 className='text-2xl' key={price.id}>
                  {price.price}
                </h1>
              ))}
            <Button
              className='w-full rounded-lg font-semibold'
              size='lg'
              asChild
            >
              <Link href='#options'>Check availability</Link>
            </Button>
          </Card>
        </div>

        <div className='flex flex-col md:flex-row gap-2'>
          <div className='flex-1'>
            <BookingOptions prices={tour?.prices} tourId={tour?.id} />
          </div>
          <div className='w-full md:w-1/3'>
            <h2>Package Information</h2>
            <Card className='border-none shadow-none bg-rose-50'>
              <CardHeader>Itenerary</CardHeader>
              <CardContent></CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DynamicPage;
