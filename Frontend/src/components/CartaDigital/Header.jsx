import React from 'react';
import { useRestaurant } from '../../hooks/useRestaurant';
import './Header.css';

const Header = ({ totalItems, onCartClick }) => {
  const { restaurantInfo } = useRestaurant();
  
  return (
    <header className="carta-header">
      <div className="header-content">
        <div className="logo-section">
          <h1 className="restaurant-name">🍕 {restaurantInfo.nombreRestaurante}</h1>
          <p className="restaurant-tagline">Deliciosa comida a tu alcance</p>
        </div>
        
        <div className="cart-button-container">
          <button 
            className="cart-button"
            onClick={onCartClick}
            aria-label="Abrir carrito"
            title="Carrito"
          >
            <span className="cart-icon" aria-hidden="true">
              <svg className="cart-svg" viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 4h-2m2 0h12l-1.5 9h-10l-2-9zm0 0l-1 5m0 0h12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="10" cy="20" r="1.8" fill="currentColor"/>
                <circle cx="17" cy="20" r="1.8" fill="currentColor"/>
              </svg>
            </span>
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
