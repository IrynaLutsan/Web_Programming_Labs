import './Header.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">IrynaShoeStore</Link>
        </div>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        
        <nav className={isMenuOpen ? 'active' : ''}>
          <ul>
            <li>
              <Link to="/" onClick={handleLinkClick}>Home</Link>
            </li>
            <li>
              <Link to="/catalog" onClick={handleLinkClick}>Catalog</Link>
            </li>
            <li>
              <Link to="/cart" onClick={handleLinkClick}>Cart</Link>
            </li>
          </ul>
        </nav>
        
        <div className="header-actions">
          
          <div className="cart-icon">
            <Link to="/cart">
              <span>🛒</span>
            </Link>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Header;