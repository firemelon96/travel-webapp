import { getTours } from '@/lib/tour';
import { ItemCard } from '@/components/item-card';

const TourPage = async () => {
  const tours = await getTours();
  return (
    <main>
      <div className='h-44 bg-rose-50'>
        <div className='container mx-auto flex items-center'>Hello</div>
      </div>
      <div className='container mx-auto flex justify-between'>
        <p>Filter</p>
        <span>Sort</span>
      </div>
      <div className='container mx-auto'>
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 '>
          {tours.map((tour) => (
            <ItemCard
              key={tour.id}
              address={tour.address}
              image={tour.images[0]}
              id={tour.id}
              prices={tour.prices}
              title={tour.title}
              likes={tour.likes}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default TourPage;
