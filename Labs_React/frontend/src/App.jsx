import './App.css';
import Header from "./containers/Components/Header/Header.jsx";
import HeroSection from './containers/Components/HeroSection/HeroSection.jsx';
import NewsList from './containers/Components/NewsList/NewsList.jsx';
import Footer from './containers/Components/Footer/Footer.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <HeroSection />
      <NewsList />
      <Footer />
    </div>
  );
}

export default App;