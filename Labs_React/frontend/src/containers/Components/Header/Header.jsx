import './Header.css';
import { useState } from 'react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">IrynaShoeStore</div>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        
        <nav className={isMenuOpen ? 'active' : ''}>
          <ul>
            <li><a href="/" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="/" onClick={() => setIsMenuOpen(false)}>Products</a></li>
            <li><a href="/" onClick={() => setIsMenuOpen(false)}>About Us</a></li>
          </ul>
        </nav>
        
        <div className="cart-icon">
          <span>🛒 Cart</span>
        </div>
      </div>
    </header>
  );
}

export default Header;