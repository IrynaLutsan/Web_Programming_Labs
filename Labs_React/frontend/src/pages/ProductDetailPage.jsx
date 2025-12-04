import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchShoeById } from '../api/shoesApi'; 
import Loader from '../containers/Components/Loader/Loader.jsx'; 

import PrimaryButton from '../containers/Components/ui/PrimaryButton';
import SecondaryButton from '../containers/Components/ui/SecondaryButton';

import Adidas from '../assets/Adidas.jpg';
import Asics from '../assets/Asics.jpg';
import Converse from '../assets/Converse.jpg';
import Newbalance from '../assets/Newbalance.jpg';
import Nike from '../assets/Nike.jpg';
import Puma from '../assets/Puma.jpg';
import Salomon from '../assets/Salomon.jpg';
import DefaultImage from '../assets/shoes_store.jpg';


const sharedStyles = {
    mainContainer: {
        display: 'flex',
        gap: '40px',
        padding: '40px 0',
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: '#fff',
    },
    imageContainer: {
        flex: '1',
        minWidth: '400px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 'auto',
        objectFit: 'cover',
    },
    details: {
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    action: {
        marginTop: '30px',
        display: 'flex',
        gap: '15px',
        alignItems: 'center',
    },
    price: {
        fontSize: '2.5em',
        fontWeight: 'bold',
        color: '#333',
        margin: '10px 0',
    }
};


function ProductDetailPage() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); 
        setError(null);
        
        const data = await fetchShoeById(id);
        setProduct(data);

      } catch (err) {
        if (err.response && err.response.status === 404) {
             setError('Товар не знайдено.');
        } else {
             setError(`Помилка завантаження даних: ${err.message}`);
             console.error(`Помилка завантаження товару ${id}:`, err);
        }
      } finally {
        setLoading(false); 
      }
    };

    fetchProduct();
  }, [id]); 

  // Логіка вибору зображення
  const getImageUrl = (producerName) => {
    switch (producerName?.toLowerCase()) {
      case 'nike': return Nike;
      case 'adidas': return Adidas;
      case 'puma': return Puma;
      case 'new balance': return Newbalance;
      case 'converse': return Converse;
      case 'asics': return Asics;
      case 'salomon': return Salomon;
      default: return DefaultImage;
    }
  };

  // УМОВНИЙ РЕНДЕРИНГ
  if (loading) return <Loader />;
  if (error) return <p style={{ padding: '20px', textAlign: 'center', color: 'red' }}>Сталася помилка: {error}</p>;
  if (!product) return <p style={{ padding: '20px', textAlign: 'center' }}>Товар не знайдено.</p>;

  // Якщо товар успішно завантажено, відображаємо його
  return (
    <div style={sharedStyles.mainContainer}>
      <div style={sharedStyles.imageContainer}>
        <img src={getImageUrl(product.producer)} alt={product.producer} style={sharedStyles.image} />
      </div>
      <div style={sharedStyles.details}>
        <h1>{product.producer} {product.color} Sneaker</h1>
        <p style={{ fontSize: '1.2em', color: '#666' }}>
          **Size:** {product.size} | **Color:** {product.color}
        </p>
        <div style={sharedStyles.price}>${product.price.toFixed(2)}</div>
        
        <p>
            Це детальний опис товару, який може бути розширений. 
            Наразі він імітує реальний контент для демонстрації.
            Це взуття ідеально підходить для **{product.producer}** ентузіастів.
        </p>

        <div style={sharedStyles.action}>
          <PrimaryButton>
            Купити зараз
          </PrimaryButton>
          <SecondaryButton onClick={() => navigate('/catalog')}>
            Повернутися до каталогу
          </SecondaryButton>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;