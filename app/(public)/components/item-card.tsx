import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { PricingType, TourPricing } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  image: string;
  prices: TourPricing[];
  title: string;
  address: string;
  id: string;
};

export const ItemCard = ({ image, prices, title, address, id }: Props) => {
  const link = address.split(' ').join('-');
  return (
    <Link href={`/tours/${link}/${id}`}>
      <Card className='w-64 border-none shadow-none hover:shadow-md'>
        <div className='space-y-2 p-4'>
          <div>
            <Image
              src={image}
              width={300}
              height={300}
              alt='image'
              className='object-cover rounded-md h-44 w-64'
            />
            {prices
              .filter((joiner) => joiner.pricingType === 'JOINER')
              .map((price) => (
                <p className='text-base font-semibold' key={price.id}>
                  {price.price} / pax
                </p>
              ))}
            <span className='font-light text-slate-500'>
              {title} dfad sfasd fasfdsf dfsdfadfd
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
