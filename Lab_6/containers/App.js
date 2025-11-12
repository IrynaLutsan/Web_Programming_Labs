import './App.css';
import Header from './containers/Header/Header';
import HeroSection from './containes/HeroSection/HeroSection';
import ProductList from './containes/ProductList/ProductList';
import Footer from './containes/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <ProductList />
      <Footer />
    </div>
  );
}

export default App;