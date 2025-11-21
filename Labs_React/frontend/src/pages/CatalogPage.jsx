import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShoeCard from '../containers/Components/ShoeCard/ShoeCard';
import SecondaryButton from '../containers/Components/ui/SecondaryButton';
import PrimaryButton from '../containers/Components/ui/PrimaryButton'; 
import { Link } from 'react-router-dom';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: '20px',
  padding: '20px 0'
};

const filterBarStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '15px',
  alignItems: 'center',
  padding: '10px 0'
};

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
  const [searchTerm, setSearchTerm] = useState(''); 
  const [selectedColor, setSelectedColor] = useState('All'); 
  const [selectedProducer, setSelectedProducer] = useState('All'); 
  
  useEffect(() => {
    setIsEditDisabled(selectedId === null);
    setIsDeleteDisabled(selectedId === null);
  }, [selectedId]);

  // Обробник зміни фільтра кольору
  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };
 
  const handleProducerChange = (e) => {
    setSelectedProducer(e.target.value);
  };

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

  useEffect(() => {
    fetchProducts();
  }, []);

  
  const handleDelete = async () => {
    if (!selectedId) {
      alert("Будь ласка, оберіть товар для видалення.");
      return;
    }

    if (window.confirm('Ви впевнені, що хочете видалити цей товар?')) {
      try {
        await axios.delete(`/api/shoes/${selectedId}`);
        setSelectedId(null);
        alert('Товар успішно видалено!');
        fetchProducts(); 
        
      } catch (err) {
        console.error("Помилка видалення:", err);
        alert("Не вдалося видалити товар: " + err.message);
      }
    }
  };

  // Отримуємо унікальні кольори та бренди
  const allColors = [...new Set(products.map(p => p.color))].sort();
  const allProducers = [...new Set(products.map(p => p.producer))].sort();

  const filteredProducts = products.filter(product => {
    
    const colorFilterPassed = selectedColor === 'All' || product.color === selectedColor;
    const producerFilterPassed = selectedProducer === 'All' || product.producer === selectedProducer;
    
    if (!(colorFilterPassed && producerFilterPassed)) return false; 

    const query = searchTerm.toLowerCase().trim();
    if (query === '') return true;

    // Логіка текстового пошуку
    const producerMatch = product.producer.toLowerCase().includes(query);
    const colorMatch = product.color.toLowerCase().includes(query);
    const priceMatch = String(product.price).includes(query);
    const sizeMatch = String(product.size).includes(query);

    return producerMatch || colorMatch || priceMatch || sizeMatch;
  });


  if (loading) return <p>Завантаження товарів...</p>;
  if (error) return <p>Сталася помилка: {error}</p>;


  return (
    <div>
      <h2>Наш Каталог</h2>

      <div style={adminPanelStyles}>
        <Link to="/catalog/new" style={{ textDecoration: 'none' }}>
          <PrimaryButton as="span"> 
            Додати Взуття
          </PrimaryButton>
        </Link>
        
        <Link 
          to={`/catalog/edit/${selectedId}`} 
          style={{ textDecoration: 'none' }}
        >
          <SecondaryButton as="span" disabled={isEditDisabled}>
            Редагувати Обране
          </SecondaryButton>
        </Link>
        
        <SecondaryButton 
          disabled={isDeleteDisabled}
          style={!isDeleteDisabled ? {backgroundColor: '#ffdddd', borderColor: '#ff5555', color: '#d00'} : {}}
          onClick={handleDelete}
        >
          Видалити Обране
        </SecondaryButton>
      </div>

      <div style={filterBarStyles}>
        <input 
          type="text"
          placeholder="Пошук за виробником, кольором, ціною..."
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', flexGrow: 1 }}
        />
        
        <select 
          value={selectedColor} 
          onChange={handleColorChange}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="All">All Colors</option>
          {allColors.map(color => (
            <option key={color} value={color}>{color}</option>
          ))}
        </select>
        
        <select 
          value={selectedProducer} 
          onChange={handleProducerChange}
          style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="All">All Brands</option>
          {allProducers.map(producer => (
            <option key={producer} value={producer}>{producer}</option>
          ))}
        </select>
        
      </div>
      <hr />

      <div style={gridStyles}>
        {filteredProducts.map(product => (
          <ShoeCard 
            key={product.id} 
            product={product}
            onSelect={() => {
              setSelectedId(prevId => prevId === product.id ? null : product.id);
            }}
            isSelected={product.id === selectedId}
          />
        ))}
        {filteredProducts.length === 0 && <p>За вашим запитом нічого не знайдено.</p>}
      </div>
    </div>
  );
}

export default CatalogPage;
