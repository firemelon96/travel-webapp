'use client';

import { columns } from './column';
import { DataTable } from '../_components/data-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AddButton } from '../_components/add-button';
import { useGetTours } from '@/features/admin/tours/api/use-get-tours';
import { useBulkDeleteTours } from '@/features/admin/tours/api/use-bulk-delete-tours';

const TravelPage = () => {
  const { data } = useGetTours();

  const { mutate, isPending } = useBulkDeleteTours();

  return (
    <div className='max-w-screen-2xl mx-auto w-full p-4'>
      <Card className='border-none drop-shadow-none'>
        <CardHeader className='gap-y-2 lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <CardTitle className='text-xl line-clamp-1 uppercase'>
              Tour Page
            </CardTitle>
            <CardDescription>This is your tour page</CardDescription>
          </div>
          <AddButton>Add Tour</AddButton>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey='title'
            columns={columns}
            data={data || []}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              mutate(ids);
            }}
            disabled={isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelPage;
