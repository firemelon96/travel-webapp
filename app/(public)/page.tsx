import { Hero } from './components/hero';
import { ItemsCarousel } from './components/items-carousel';

const Home = () => {
  return (
    <main>
      <Hero />
      {/* <FilterServices /> */}
      <ItemsCarousel />
    </main>
  );
};

export default Home;
