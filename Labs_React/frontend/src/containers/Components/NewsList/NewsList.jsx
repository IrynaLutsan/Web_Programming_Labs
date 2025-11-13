import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard.jsx';
import './NewsList.css'; 

function NewsList() { 
  const [featuredNews, setFeaturedNews] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedNews = async () => { 
      try {
        const response = await fetch('http://localhost:5001/api/featured-news'); 
        
        if (!response.ok) {
          throw new Error('Failed to fetch featured news'); 
        }
        
        const data = await response.json();
        setFeaturedNews(data); 
      } catch (err) {
        setError(err.message);
        console.error('Error fetching featured news:', err); 
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedNews(); 
  }, []);

  const handleViewMore = () => {
    // Тут можна додати логіку для завантаження більше новин
    // або переходу на сторінку з усіма новинами
    console.log('View more clicked');
  };

  if (loading) {
    return (
      <section className="news-list">
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <div className="loading">Loading...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="news-list">
        <div className="container">
          <h2 className="section-title">New Arrivals</h2>
          <div className="error">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="news-list">
      <div className="container">
        <h2 className="section-title">New Arrivals</h2>
        <div className="news-grid">
          {featuredNews.map(newsItem => ( 
            <ProductCard
              key={newsItem.id}
              image={newsItem.image}
              title={newsItem.title}
              type="news" 
            />
          ))}
        </div>
        <button className="view-more-btn" onClick={handleViewMore}>
          View More
        </button>
      </div>
    </section>
  );
}

export default NewsList;