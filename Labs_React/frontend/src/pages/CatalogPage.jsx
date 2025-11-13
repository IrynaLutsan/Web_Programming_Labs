import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoeCard from '../containers/Components/ShoeCard/ShoeCard';
import SecondaryButton from '../containers/Components/ui/SecondaryButton';
import PrimaryButton from '../containers/Components/ui/PrimaryButton'; 
import { Link } from 'react-router-dom';

// Стилі для СІТКИ (Grid)
const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
  padding: '20px 0'
};

// Стилі для панелі фільтрів
const filterBarStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
  alignItems: 'center',
  padding: '10px 0'
};

// Стилі для адмін-панелі
const adminPanelStyles = {
  padding: '15px',
  backgroundColor: '#f4f4f4',
  border: '1px solid #ddd',
  borderRadius: '8px',
  display: 'flex',
  gap: '10px',
  marginBottom: '20px',
};

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
  
  useEffect(() => {
    setIsEditDisabled(selectedId === null);
    setIsDeleteDisabled(selectedId === null);
  }, [selectedId]);


  // 1. Ми винесемо 'fetchProducts' з 'useEffect', 
  //    щоб мати можливість викликати її повторно
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/shoes');
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Помилка завантаження взуття:", err);
    } finally {
      setLoading(false);
    }
  };

  // 2. useEffect тепер просто викликає 'fetchProducts' при першому завантаженні
  useEffect(() => {
    fetchProducts();
  }, []); // [] - виконати 1 раз при завантаженні

  
  // 3. НОВА ФУНКЦІЯ: Логіка видалення
  const handleDelete = async () => {
    // Перевірка, чи щось обрано
    if (!selectedId) {
      alert("Будь ласка, оберіть товар для видалення.");
      return;
    }

    // 4. Запитуємо підтвердження
    if (window.confirm('Ви впевнені, що хочете видалити цей товар?')) {
      try {
        // 5. Робимо запит до API на видалення
        await axios.delete(`/api/shoes/${selectedId}`);
        
        // 6. Скидаємо вибір
        setSelectedId(null);
        
        // 7. ОНОВЛЮЄМО список, завантаживши його знову
        alert('Товар успішно видалено!');
        fetchProducts(); // Викликаємо завантаження даних
        
      } catch (err) {
        console.error("Помилка видалення:", err);
        alert("Не вдалося видалити товар: " + err.message);
      }
    }
  };


  if (loading) return <p>Завантаження товарів...</p>;
  if (error) return <p>Сталася помилка: {error}</p>;


  return (
    <div>
      <h2>Наш Каталог</h2>

      <div style={adminPanelStyles}>
        {/* 1. ЗАМІНЮЄМО PrimaryButton НА <Link> */}
        <Link to="/catalog/new" style={{ textDecoration: 'none' }}>
          <PrimaryButton as="span"> {/* 'as="span"' змусить кнопку вести себе як блок */}
            Додати Взуття
          </PrimaryButton>
        </Link>
        
        <SecondaryButton disabled={isEditDisabled}>
          Редагувати Обране
        </SecondaryButton>
        <SecondaryButton 
          disabled={isDeleteDisabled}
          style={!isDeleteDisabled ? {backgroundColor: '#ffdddd', borderColor: '#ff5555', color: '#d00'} : {}}
          onClick={handleDelete}
        >
          Видалити Обране
        </SecondaryButton>
      </div>

      {/* ... (решта вашого JSX-коду: фільтри, hr, .map()) ... */}

      <div style={filterBarStyles}>
        {/* ... */}
      </div>
      <hr />

      <div style={gridStyles}>
        {products.map(product => (
          <ShoeCard 
            key={product.id} 
            product={product}
            onSelect={() => {
              // Додамо логіку "зняття виділення", якщо клікнути на ту саму картку
              setSelectedId(prevId => prevId === product.id ? null : product.id);
            }}
            isSelected={product.id === selectedId}
          />
        ))}
      </div>
    </div>
  );
}

export default CatalogPage;