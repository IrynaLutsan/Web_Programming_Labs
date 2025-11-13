import React, { useState } from 'react';
import axios from 'axios';
// useNavigate - хук для програмної навігації (переходу на іншу сторінку)
import { useNavigate } from 'react-router-dom'; 
import PrimaryButton from '../containers/Components/ui/PrimaryButton';
import SecondaryButton from '../containers/Components/ui/SecondaryButton';

const formContainerStyles = {
  maxWidth: '600px',
  margin: '20px auto',
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
};

const formGroupStyles = {
  marginBottom: '15px',
};

const labelStyles = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyles = {
  width: '100%',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonGroupStyles = {
  display: 'flex',
  gap: '10px',
};


function ShoeFormPage() {
  // Створюємо 'навігатор'
  const navigate = useNavigate();

  // Створюємо стан для кожного поля форми
  const [producer, setProducer] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [error, setError] = useState(null); // Для показу помилок

  // Функція, що викликається при відправці форми
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!producer || !price || !size || !color) {
      setError('Будь ласка, заповніть усі поля');
      return;
    }
    
    const newShoe = {
      producer: producer.trim(),
      price: parseFloat(price),
      size: parseInt(size),
      color: color.trim(),
    };

    try {
      await axios.post('/api/shoes', newShoe);
      alert('Товар успішно додано!');
      navigate('/catalog');

    } catch (err) {
      setError(err.message);
      console.error("Помилка додавання товару:", err);
    }
  };

  return (
    <div style={formContainerStyles}>
      <h2>Додати нове взуття</h2>
      
      {/* 'onSubmit' прив'язує нашу функцію до форми */}
      <form onSubmit={handleSubmit}>
        
        {/* Поле Producer */}
        <div style={formGroupStyles}>
          <label style={labelStyles} htmlFor="producer">Виробник:</label>
          <input
            style={inputStyles}
            type="text"
            id="producer"
            value={producer}
            onChange={(e) => setProducer(e.target.value)}
          />
        </div>

        {/* Поле Price */}
        <div style={formGroupStyles}>
          <label style={labelStyles} htmlFor="price">Ціна:</label>
          <input
            style={inputStyles}
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        {/* Поле Size */}
        <div style={formGroupStyles}>
          <label style={labelStyles} htmlFor="size">Розмір:</label>
          <input
            style={inputStyles}
            type="number"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>

        {/* Поле Color */}
        <div style={formGroupStyles}>
          <label style={labelStyles} htmlFor="color">Колір:</label>
          <input
            style={inputStyles}
            type="text"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        {/* 8. Показ помилок валідації */}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* 9. Кнопки */}
        <div style={buttonGroupStyles}>
          <PrimaryButton type="submit">Зберегти</PrimaryButton>
          <SecondaryButton type="button" onClick={() => navigate('/catalog')}>
            Скасувати
          </SecondaryButton>
        </div>

      </form>
    </div>
  );
}

export default ShoeFormPage;