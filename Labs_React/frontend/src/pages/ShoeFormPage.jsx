import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; 
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
  const navigate = useNavigate();
  // Читаєм ID з URL та визначаємо режим
  const { id } = useParams(); 
  const isEditMode = !!id; 

  const [producer, setProducer] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [error, setError] = useState(null); 

  // Завантаження даних для редагування
  useEffect(() => {
    if (isEditMode) {
      const fetchShoeData = async () => {
        try {
          const response = await axios.get(`/api/shoes/${id}`);
          const data = response.data;
          
          setProducer(data.producer);
          setPrice(data.price);
          setSize(data.size);
          setColor(data.color);

        } catch (err) {
          setError(`Помилка завантаження даних: ${err.message}. Перенаправлення...`);
          console.error("Помилка завантаження:", err);
          setTimeout(() => navigate('/catalog'), 2000); 
        }
      };
      fetchShoeData();
    }
  }, [id, isEditMode, navigate]); 


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null);

    if (!producer || !price || !size || !color) {
      setError('Будь ласка, заповніть усі поля');
      return;
    }
    
    const shoeData = {
      producer: producer.trim(),
      price: parseFloat(price),
      size: parseInt(size),
      color: color.trim(),
    };
    
    const url = isEditMode ? `/api/shoes/${id}` : '/api/shoes';
    const method = isEditMode ? 'put' : 'post';
    const successMessage = isEditMode ? 'Товар успішно оновлено!' : 'Товар успішно додано!';


    try {
      await axios({
        method: method,
        url: url,
        data: shoeData
      });
      
      alert(successMessage);
      navigate('/catalog');

    } catch (err) {
      setError(err.message);
      console.error("Помилка відправлення форми:", err);
    }
  };

  return (
    <div style={formContainerStyles}>
      <h2>{isEditMode ? 'Редагувати Взуття' : 'Додати нове взуття'}</h2>
      
      <form onSubmit={handleSubmit}>
        
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

        {error && <p style={{ color: 'red' }}>Помилка: {error}</p>}

        <div style={buttonGroupStyles}>
          <PrimaryButton type="submit">
            {isEditMode ? 'Зберегти зміни' : 'Додати'}
          </PrimaryButton>
          <SecondaryButton type="button" onClick={() => navigate('/catalog')}>
            Скасувати
          </SecondaryButton>
        </div>

      </form>
    </div>
  );
}

export default ShoeFormPage;