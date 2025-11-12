import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">YourShoeStore</div>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/">Products</a></li>
            <li><a href="/">About Us</a></li>
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