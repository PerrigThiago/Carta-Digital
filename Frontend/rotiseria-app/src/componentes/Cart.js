import React, { useState } from 'react';
import '../estilos/Cart.css';
import { useOrders } from '../datos/useApi';
import { handleApiError } from '../datos/api';

function Cart({ items, onRemove }) {
  const { createOrder, loading: orderLoading, error: orderError } = useOrders();
  const [orderSuccess, setOrderSuccess] = useState(false);

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleCreateOrder = async () => {
    if (items.length === 0) return;

    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1
        })),
        total: total,
        status: 'PENDING',
        orderDate: new Date().toISOString(),
        // Aquí podrías agregar más datos como dirección, teléfono, etc.
      };

      await createOrder(orderData);
      setOrderSuccess(true);
      
      // Limpiar el carrito después de 3 segundos
      setTimeout(() => {
        setOrderSuccess(false);
        // Aquí podrías llamar a una función para limpiar el carrito
      }, 3000);

    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  // Mostrar mensaje de éxito
  if (orderSuccess) {
    return (
      <div className="cart">
        <div className="success-container">
          <div className="success-icon">✅</div>
          <h2>¡Pedido Enviado!</h2>
          <p>Tu pedido ha sido recibido y está siendo procesado.</p>
          <p>Te contactaremos pronto para confirmar los detalles.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Tu Pedido</h2>
      
      {items.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          {items.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name}</span>
              <span>${(item.price || 0).toFixed(2)}</span>
              <button onClick={() => onRemove(index)}>❌</button>
            </div>
          ))}
          
          <div className="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          
          {orderError && (
            <div className="error-message">
              {handleApiError(orderError)}
            </div>
          )}
          
          <button 
            className="order-button"
            onClick={handleCreateOrder}
            disabled={orderLoading || items.length === 0}
          >
            {orderLoading ? 'Enviando Pedido...' : 'Realizar Pedido'}
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
