import { auth } from '@/auth';
import { Hero } from './components/hero';
import { ItemsCarousel } from './components/items-carousel';
import { FilterServices } from './components/filter-services';

const Home = async () => {
  return (
    <main>
      <Hero />
      {/* <FilterServices /> */}
      <ItemsCarousel />
    </main>
  );
};

export default Home;
