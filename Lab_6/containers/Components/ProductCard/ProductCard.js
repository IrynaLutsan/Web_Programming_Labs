import ProductCard from './ProductCard';
import './ProductCard.css';

function ProductCard({ image, title, price }) {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <h3 className="product-title">{title}</h3>
      <p className="product-price">{price}</p>
    </div>
  );
}

export default ProductCard;