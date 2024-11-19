import { ItemCard } from '@/components/item-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { getFeaturedTours } from '@/lib/tour';

export const ItemsCarousel = async () => {
  const featuredTours = await getFeaturedTours();

  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className='w-full container mx-auto -mt-28'
    >
      <CarouselContent className='space-x-3'>
        {featuredTours.map((tour) => (
          <CarouselItem
            key={tour.id}
            className='basis-1/2 md:basis-1/3 lg:basis-1/5 2xl:basis-1/5'
          >
            <div className='p-1'>
              <ItemCard
                image={tour.images[0]}
                title={tour.title}
                prices={tour.prices}
                address={tour.address}
                id={tour.id}
                likes={tour.likes}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};
