import { ItemCard } from '@/components/item-card';
import { Card, CardHeader } from '@/components/ui/card';
import { db } from '@/lib/db';

const Wishlist = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const wishlists = await db.tour.findMany({
    where: {
      likes: {
        some: {
          userId: id,
        },
      },
    },
    include: { likes: true, prices: true },
  });
  return (
    <Card className=''>
      <CardHeader>Wishlists</CardHeader>
      <div className='flex p-4 gap-2 flex-wrap'>
        {wishlists.map((tour) => (
          <ItemCard
            address={tour.address}
            id={tour.id}
            image={tour.images[0]}
            likes={tour.likes}
            prices={tour.prices}
            title={tour.title}
            key={tour.id}
          />
        ))}
      </div>
    </Card>
  );
};

export default Wishlist;
