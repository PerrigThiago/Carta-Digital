import React from 'react';
import './Cart.css';

const Cart = ({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout, 
  onBack, 
  totalPrice 
}) => {
  const formatPrice = (price) => {
    return `$${price?.toLocaleString() || '0'}`;
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      onRemoveItem(productId);
    } else {
      onUpdateQuantity(productId, newQuantity);
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <button className="back-btn" onClick={onBack}>
          ← Volver al Menú
        </button>
        <h2>Mi Pedido</h2>
      </div>

      <div className="cart-content">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h3>Tu carrito está vacío</h3>
            <p>Agrega algunos productos deliciosos</p>
            <button className="continue-shopping-btn" onClick={onBack}>
              Ver Menú
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="item-info">
                    <h4 className="item-name">{item.nombre}</h4>
                    <p className="item-price">{formatPrice(item.precio)} c/u</p>
                  </div>
                  
                  <div className="item-controls">
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    
                    <div className="item-total">
                      {formatPrice(item.precio * item.quantity)}
                    </div>
                    
                    <button 
                      className="remove-btn"
                      onClick={() => onRemoveItem(item.id)}
                      title="Eliminar del carrito"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="total-section">
                <div className="total-line">
                  <span>Subtotal:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="total-line total-final">
                  <span>Total:</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
              </div>
              
              <button 
                className="checkout-btn"
                onClick={onCheckout}
              >
                Proceder al Pedido
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
