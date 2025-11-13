import React, { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PrimaryButton from '../containers/Components/ui/PrimaryButton';
import SecondaryButton from '../containers/Components/ui/SecondaryButton';

import nikeImage from '../assets/nike.jpg';
import adidasImage from '../assets/adidas.jpg';
import asicsImage from '../assets/asics.jpg';
import converseImage from '../assets/converse.jpg';
import newbalanceImage from '../assets/newbalance.jpg';
import pumaImage from '../assets/puma.jpg';
import salomonImage from '../assets/salomon.jpg';
import defaultShoeImage from '../assets/shoes_store.jpg';

const producerImages = {
  'nike': nikeImage, 'adidas': adidasImage, 'asics': asicsImage,
  'converse': converseImage, 'newbalance': newbalanceImage, 'puma': pumaImage,
  'salomon': salomonImage, 'testnike': nikeImage, 
};

const detailContainerStyles = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '40px',
  maxWidth: '1000px',
  margin: '40px auto',
  padding: '20px',
};

const imageContainerStyles = {
  width: '100%',
  backgroundColor: '#f4f4f4',
  borderRadius: '8px',
  padding: '20px',
};

const imageStyles = {
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
};

const infoContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
};

const titleStyles = {
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 15px 0',
};

const descriptionStyles = {
  fontSize: '16px',
  color: '#555',
  lineHeight: '1.6',
  marginBottom: '20px',
};

const priceStyles = {
  fontSize: '28px',
  fontWeight: 'bold',
  margin: 'auto 0 20px 0', 
};

const buttonGroupStyles = {
  display: 'flex',
  gap: '15px',
};


function ProductDetailPage() {
  // 5. Отримуємо 'id' з URL (напр., /product/123 -> id = '123')
  const { id } = useParams(); 
  const navigate = useNavigate(); // Для кнопки "Go back"

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        // 6. Робимо запит до API, використовуючи 'id' з URL
        const response = await axios.get(`/api/shoes/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
        console.error(`Помилка завантаження товару ${id}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // [id] - означає "виконати цей ефект, якщо 'id' в URL змінився"

  // Логіка вибору зображення (така сама, як у ShoeCard)
  const getImageUrl = (producerName) => {
    return producerImages[producerName.toLowerCase().trim()] || defaultShoeImage;
  };

  if (loading) return <p>Завантаження товару...</p>;
  if (error) return <p>Сталася помилка: {error}</p>;
  if (!product) return <p>Товар не знайдено.</p>; // Якщо API повернуло 404

  return (
    <div style={detailContainerStyles}>
      {/* Ліва колонка: Зображення */}
      <div style={imageContainerStyles}>
        <img 
          src={getImageUrl(product.producer)} 
          alt={product.producer} 
          style={imageStyles} 
        />
      </div>

      {/* Права колонка: Інформація */}
      <div style={infoContainerStyles}>
        <h1 style={titleStyles}>
          {product.producer} (Size: {product.size} / Color: {product.color})
        </h1>
        
        <p style={descriptionStyles}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, 
          nulla sit amet, commmodo ligula eget dolor. Aenean massa. 
          Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>

        {/* (Тут можна додати поля "Countable" та "Selectable" з макету) */}

        <p style={priceStyles}>
          Price: ${product.price}
        </p>

        <div style={buttonGroupStyles}>
          <SecondaryButton onClick={() => navigate('/catalog')}>
            Go back
          </SecondaryButton>
          <PrimaryButton onClick={() => alert('Додано в кошик!')}>
            Add to cart
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;