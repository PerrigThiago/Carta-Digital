import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const formatPrice = (price) => {
    return `$${price?.toLocaleString() || '0'}`;
  };

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <div className="product-placeholder">
          {product.grupo === 'PIZZAS' ? '🍕' : 
           product.grupo === 'BEBIDAS' ? '🥤' : 
           product.grupo === 'POSTRES' ? '🍰' : 
           product.grupo === 'ENTRADAS' ? '🥗' : '🍽️'}
        </div>
        {!product.disponibilidad && (
          <div className="unavailable-overlay">
            <span>No Disponible</span>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.nombre}</h3>
        <p className="product-description">{product.descripcion || 'Delicioso producto de nuestro menú'}</p>
        <div className="product-details">
          <span className="product-category">{product.grupo}</span>
          <span className="product-price">{formatPrice(product.precio)}</span>
        </div>
        
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!product.disponibilidad}
        >
          {product.disponibilidad ? 'Agregar al Pedido' : 'No Disponible'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
