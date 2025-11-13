import HeroSection from '../containers/Components/HeroSection/HeroSection.jsx';
import NewsList from '../containers/Components/NewsList/NewsList.jsx';

// Це, по суті, той контент, що у вас був в App.jsx,
// але тепер він інкапсульований у власний компонент "Сторінки".
function HomePage() {
  return (
    <>
      <HeroSection />
      <NewsList />
    </>
  );
}

export default HomePage;