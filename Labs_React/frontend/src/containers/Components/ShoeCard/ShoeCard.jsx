import { Link } from 'react-router-dom';
import PrimaryButton from '../ui/PrimaryButton';
import './ShoeCard.css';

import nikeImage from '../../../assets/nike.jpg';
import adidasImage from '../../../assets/adidas.jpg';
import asicsImage from '../../../assets/asics.jpg';
import converseImage from '../../../assets/converse.jpg';
import newbalanceImage from '../../../assets/newbalance.jpg';
import pumaImage from '../../../assets/puma.jpg';
import salomonImage from '../../../assets/salomon.jpg';
import defaultShoeImage from '../../../assets/shoes_store.jpg'; 


const producerImages = {
  'nike': nikeImage,
  'adidas': adidasImage,
  'asics': asicsImage,
  'converse': converseImage,
  'newbalance': newbalanceImage,
  'puma': pumaImage,
  'salomon': salomonImage,
  'testnike': nikeImage,
};


function ShoeCard({ product, onSelect, isSelected }) {
  const { producer, price, color, size, id } = product; 
  const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla sit amet.';

  const imageUrl = producerImages[producer.toLowerCase().trim()] 
                   || defaultShoeImage;
  return (
    <div 
      className={`shoe-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect} 
    >
      <div className="shoe-image-container">
        <img src={imageUrl} alt={producer} className="shoe-image" />
      </div>
      
      <div className="shoe-info">
        <h3 className="shoe-title">{producer} (Size: {size})</h3>
        <p className="shoe-description">{description}</p>
        
        <div className="shoe-price-wrapper">
          <span className="shoe-price-label">Price:</span>
          <span className="shoe-price-value">${price}</span>
        </div>

        <Link 
          to={`/product/${id}`} // <-- Динамічне посилання на сторінку продукту
          style={{ textDecoration: 'none' }}
          onClick={(e) => e.stopPropagation()} 
        >
          <PrimaryButton as="span"> {/* Використовуємо 'as="span"', як і раніше */}
            View more
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
}

export default ShoeCard;