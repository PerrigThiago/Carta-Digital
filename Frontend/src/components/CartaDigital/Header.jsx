import React from 'react';
import './Header.css';

const Header = ({ totalItems, onCartClick }) => {
  return (
    <header className="carta-header">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="restaurant-name">🍕 Restaurante Digital</h1>
          <p className="restaurant-tagline">Deliciosa comida a tu alcance</p>
        </div>
        
        <div className="cart-button-container">
          <button 
            className="cart-button"
            onClick={onCartClick}
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Mi Pedido</span>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
