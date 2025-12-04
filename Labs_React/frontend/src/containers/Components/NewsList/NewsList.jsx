import { useState, useEffect } from 'react'; 
import ProductCard from '../ProductCard/ProductCard.jsx';
import './NewsList.css'; 
import { fetchFeaturedNews } from '../../../api/shoesApi'; // Шлях до API-сервісу
import Loader from '../Loader/Loader.jsx'; // 👈 Loader тут!

function NewsList() { 
  const [featuredNews, setFeaturedNews] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3); 

  useEffect(() => {
    const fetchNews = async () => { 
      try {
        setLoading(true);
        const data = await fetchFeaturedNews(); 
        
        setFeaturedNews(data); 
      } catch (err) {
        setError(err.message);
        console.error('Error fetching featured news:', err); 
      } finally {
        setLoading(false);
      }
    };

    fetchNews(); 
  }, []); 

  // логіка для кнопки "View More"
  const handleViewMore = () => {
    const step = 3; 
    const totalItems = featuredNews.length; 
    setVisibleCount(prevCount => Math.min(prevCount + step, totalItems));
  };

  // УМОВНИЙ РЕНДЕРИНГ: відображаємо Loader
  if (loading) {
    return (
      <section className="news-list">
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <Loader /> 
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="news-list">
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <p style={{ color: 'red' }}>Помилка: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="news-list">
      <div className="container">
        <h2 className="section-title">New Arrivals</h2>
        <div className="news-grid">
          {featuredNews
            .slice(0, visibleCount) 
            .map(newsItem => ( 
              <ProductCard
                key={newsItem.id}
                image={newsItem.image}
                title={newsItem.title}
                type="news" 
              />
            ))}
        </div>
        
        {visibleCount < featuredNews.length && (
          <button className="view-more-btn" onClick={handleViewMore}>
            View More
          </button>
        )}
        
      </div>
    </section>
  );
}

export default NewsList;