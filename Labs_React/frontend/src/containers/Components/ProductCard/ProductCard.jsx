import './ProductCard.css';

function ProductCard({ image, title, price, type = 'news' }) {
  return (
    <div className={`product-card ${type === 'shoe' ? 'product-card--shoe' : ''}`}>
      <div className="product-image-container">
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        {price && <p className="product-price">{price} грн</p>}
      </div>
    </div>
  );
}

export default ProductCard;