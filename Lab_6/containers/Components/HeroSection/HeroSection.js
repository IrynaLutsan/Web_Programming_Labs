import './HeroSection.css';
// Імпортуємо ваше 4-те зображення
import heroImage from '../../assets/shoes_store.webp'; 

function HeroSection() {
  return (
    <section className="hero">
      <div className="container hero-container">
        <div className="hero-content">
          <h1>Find Your Perfect Pair</h1>
          <p>Explore our latest collection of premium shoes.</p>
          <button className="hero-button">Shop Now</button>
        </div>
        <div className="hero-image">
          <img src={heroImage} alt="Collection of shoes" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;