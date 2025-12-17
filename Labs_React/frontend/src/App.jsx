import './App.css';
import Header from "./containers/Components/Header/Header.jsx";
import Footer from "./containers/Components/Footer/Footer.jsx";
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import ShoeFormPage from './pages/ShoeFormPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';

function App() {
  return (
    <div className="App">
      <Header />

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/new" element={<ShoeFormPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/catalog/edit/:id" element={<ShoeFormPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;