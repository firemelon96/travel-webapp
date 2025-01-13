import { Hero } from './components/hero';
import { ItemsCarousel } from './components/items-carousel';
import { OtherServices } from './components/other-services';
import { Tours } from './components/tours';

const Home = () => {
  return (
    <main>
      <Hero />
      {/* <FilterServices /> */}
      <ItemsCarousel />
      <Tours />
      <OtherServices />
    </main>
  );
};

export default Home;
