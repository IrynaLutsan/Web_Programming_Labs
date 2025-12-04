import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import PrimaryButton from '../containers/Components/ui/PrimaryButton';
import SecondaryButton from '../containers/Components/ui/SecondaryButton';
import { fetchShoeById, createShoe, updateShoe } from '../api/shoesApi'; 


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

  // Завантаження даних для редагування (GET)
  useEffect(() => {
    if (isEditMode) {
      const fetchShoeData = async () => {
        try {
          // виклик API: fetchShoeById
          const data = await fetchShoeById(id);
          
          setProducer(data.producer);
          setPrice(String(data.price));
          setSize(String(data.size));
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


  // Обробка відправки форми (POST або PUT)
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(null);

    if (!producer || !price || !size || !color) {
      setError('Будь ласка, заповніть усі поля');
      return;
    }
    
    // Перетворення даних форми у потрібний для API формат
    const shoeData = {
      producer: producer.trim(),
      price: parseFloat(price),
      size: parseInt(size),
      color: color.trim(),
    };
    
    const successMessage = isEditMode ? 'Товар успішно оновлено!' : 'Товар успішно додано!';


    try {
        // виклик API: PUT для редагування, POST для створення
        if (isEditMode) {
            await updateShoe(id, shoeData); 
        } else {
            await createShoe(shoeData);   
        }
      
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