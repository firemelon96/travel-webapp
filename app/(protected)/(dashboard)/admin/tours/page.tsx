import { getTours } from '@/features/admin/tours/actions/tour';
import { columns, Tour } from './column';
import { DataTable } from '../_components/data-table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useNewTour } from '@/features/admin/tours/hooks/use-new-tour';
import { AddButton } from '../_components/add-button';

// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: '728ed52f',
//       amount: 100,
//       status: 'pending',
//       email: 'm@example.com',
//     },
//     // ...
//   ];
// }

const TravelPage = async () => {
  // const data = await getData();
  const data = await getTours();
  // console.log(tours);
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
          <DataTable filterKey='title' columns={columns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelPage;
