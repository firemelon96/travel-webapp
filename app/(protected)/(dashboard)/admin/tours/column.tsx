'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { Actions } from './actions';
import { TourPricing } from '@prisma/client';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Tour = {
  id: string;
  images: string[];
  title: string;
  prices: TourPricing[];
  type: 'DAY' | 'PACKAGE';
  isFeatured: boolean;
};

export const columns: ColumnDef<Tour>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomeRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
  },
  {
    accessorKey: 'images',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <Image
          src={row.original.images[0]}
          alt='image'
          width={50}
          height={50}
        />
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <div>
        {row.original.prices.map((price) => (
          <p key={price.id}>{price.price}</p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
