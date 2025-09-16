import React, { useState, useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/CartaDigital/ProductCard';
import Cart from '../components/CartaDigital/Cart';
import Checkout from '../components/CartaDigital/Checkout';
import Header from '../components/CartaDigital/Header';
import CategoryFilter from '../components/CartaDigital/CategoryFilter';
import './CartaDigital.css';

const CartaDigital = () => {
  const [activeCategory, setActiveCategory] = useState('TODOS');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  
  const { 
    products, 
    categories, 
    loading, 
    error, 
    searchTerm, 
    setSearchTerm 
  } = useProducts();
  
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getTotalPrice, 
    getTotalItems 
  } = useCart();

  // Filtrar productos por categoría
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'TODOS' || product.grupo === activeCategory;
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && product.disponibilidad;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleCheckout = () => {
    setShowCheckout(true);
    setShowCart(false);
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
    setShowCart(true);
  };

  const handleBackToMenu = () => {
    setShowCheckout(false);
    setShowCart(false);
  };

  if (loading) {
    return (
      <div className="carta-digital-container">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Cargando carta digital...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="carta-digital-container">
        <div className="error-screen">
          <h2>Error al cargar la carta</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="carta-digital-container">
      <Header 
        totalItems={getTotalItems()}
        onCartClick={() => setShowCart(true)}
      />
      
      {!showCart && !showCheckout && (
        <>
          <div className="search-section">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          
          <div className="products-section">
            <h2 className="section-title">
              {activeCategory === 'TODOS' ? 'Nuestro Menú' : activeCategory}
            </h2>
            
            {filteredProducts.length === 0 ? (
              <div className="no-products">
                <p>No hay productos disponibles en esta categoría</p>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {showCart && !showCheckout && (
        <Cart
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          onBack={() => setShowCart(false)}
          totalPrice={getTotalPrice()}
        />
      )}

      {showCheckout && (
        <Checkout
          cartItems={cartItems}
          totalPrice={getTotalPrice()}
          onBack={handleBackToCart}
          onBackToMenu={handleBackToMenu}
          onOrderComplete={clearCart}
        />
      )}
    </div>
  );
};

export default CartaDigital;
