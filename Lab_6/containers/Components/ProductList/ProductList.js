import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

// Імпортуємо ваші 3 зображення
import img1 from '../../assets/img1.jpeg';
import img2 from '../../assets/img2.jpeg';
import img3 from '../../assets/img3.jpeg';

// Дані, що базуються на вашій Лабі 5
const featuredProducts = [
  {
    id: 1,
    image: img1,
    title: 'Nike Air Max', //
    price: '$120' //
  },
  {
    id: 2,
    image: img2,
    title: 'Adidas Ultra Boost', //
    price: '$150' //
  },
  {
    id: 3,
    image: img3,
    title: 'Puma Suede Classic', //
    price: '$65' //
  }
];

function ProductList() {
  return (
    <section className="product-list">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductList;