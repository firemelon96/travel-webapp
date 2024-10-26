import { columns, Payment } from './column';
import { DataTable } from './data-table';

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
    // ...
  ];
}

const TravelPage = async () => {
  const data = await getData();
  return (
    <main className='p-4'>
      <div className='flex flex-col gap-4'>
        <h1 className='text-xl font-semibold'>Travel tours</h1>

        <div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </main>
  );
};

export default TravelPage;
