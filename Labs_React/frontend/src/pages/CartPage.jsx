import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, removeOneFromCart, addToCart } from '../redux/actions'; 
import PrimaryButton from '../containers/Components/ui/PrimaryButton';
import { Link } from 'react-router-dom';

import nikeImage from '../assets/Nike.jpg';
import adidasImage from '../assets/Adidas.jpg';
import asicsImage from '../assets/Asics.jpg';
import converseImage from '../assets/Converse.jpg';
import newbalanceImage from '../assets/Newbalance.jpg';
import pumaImage from '../assets/Puma.jpg';
import salomonImage from '../assets/Salomon.jpg';
import defaultShoeImage from '../assets/shoes_store.jpg';

const producerImages = {
  'nike': nikeImage,
  'adidas': adidasImage,
  'asics': asicsImage,
  'converse': converseImage,
  'newbalance': newbalanceImage,
  'puma': pumaImage,
  'salomon': salomonImage,
};

const cartContainerStyles = {
  maxWidth: '800px',
  margin: '40px auto',
  padding: '20px',
};

const cartItemStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '15px',
  borderBottom: '1px solid #eee',
  marginBottom: '10px',
};

const totalStyles = {
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'right',
  marginTop: '20px',
};

function CartPage() {
  // дістаємо товари з Redux-сховища
  const cartItems = useSelector((state) => state.cartItems);
  
  const dispatch = useDispatch();

  // створюється об'єкт, де ключ це ID, а значенням — товар + лічильник
  const groupedItems = cartItems.reduce((acc, item) => {
    if (acc[item.id]) {
      acc[item.id].count += 1; // якщо товар вже є, збільшуємо кількість
    } else {
      acc[item.id] = { ...item, count: 1 }; // якщо немає, додаємо з кількістю 1
    }
    return acc;
  }, {});

  // перетворюємо об'єкт назад у масив для відображення
  const displayItems = Object.values(groupedItems);

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);


  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Ваш кошик порожній 🛒</h2>
        <Link to="/catalog">
            <PrimaryButton>Перейти до каталогу</PrimaryButton>
        </Link>
      </div>
    );
  }

  return (
    <div style={cartContainerStyles}>
      <h1>Shopping Cart</h1>
      
      <div className="cart-list">
        {displayItems.map((item) => (
          <div key={item.id} style={cartItemStyles}>
            
            {/* картинка + опис */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img 
                src={producerImages[item.producer.toLowerCase().trim()] || defaultShoeImage} 
                alt={item.producer} 
                style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
              />
              <div>
                <h3>{item.producer}</h3>
                <p style={{color: '#666'}}>Size: {item.size} | Color: {item.color}</p>
              </div>
            </div>

            {/* лічильник + ціна */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              
              {/* кнопки +/- */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '5px' }}>
                <button 
                    onClick={() => dispatch(removeOneFromCart(item.id))} 
                    style={{ background: 'none', border: 'none', padding: '5px 10px', cursor: 'pointer', fontSize: '16px' }}
                >
                    -
                </button>
                <span style={{ padding: '0 10px', fontWeight: 'bold' }}>{item.count}</span>
                <button 
                  onClick={() => dispatch(addToCart(item))} // Додає ще один такий самий
                  style={{ background: 'none', border: 'none', padding: '5px 10px', cursor: 'pointer', fontSize: '16px' }}
                >
                  +
                </button>
              </div>

              <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
                ${(item.price * item.count).toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={totalStyles}>
        Total amount: ${totalAmount.toFixed(2)}
      </div>
      
      <div style={{ marginTop: '30px', textAlign: 'right' }}>
         <Link to="/catalog"><PrimaryButton>Back to Catalog</PrimaryButton></Link>
      </div>
    </div>
  );
}

export default CartPage;