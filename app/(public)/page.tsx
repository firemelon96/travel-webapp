import { auth } from '@/auth';
import { Hero } from './components/hero';
import { ItemsCarousel } from './components/items-carousel';
import { FilterServices } from './components/filter-services';
import { createInvoice } from '@/seed/xendit';

const Home = async () => {
  const invoice = await createInvoice();
  console.log(invoice);
  return (
    <main>
      <Hero />
      {/* <FilterServices /> */}
      <ItemsCarousel />
    </main>
  );
};

export default Home;
