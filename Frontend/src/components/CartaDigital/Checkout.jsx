import React, { useState } from 'react';
import './Checkout.css';

const Checkout = ({ 
  cartItems, 
  totalPrice, 
  onBack, 
  onBackToMenu, 
  onOrderComplete 
}) => {
  const [customerInfo, setCustomerInfo] = useState({
    nombre: '',
    direccion: '',
    notas: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const formatPrice = (price) => {
    return `$${price?.toLocaleString() || '0'}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!customerInfo.nombre) {
      alert('Por favor completa tu nombre');
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar datos del pedido
      const pedidoData = {
        nombre: customerInfo.nombre,
        telefono: 'whatsapp', // Valor fijo para WhatsApp
        direccion: customerInfo.direccion || '',
        notas: customerInfo.notas || '',
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          nombre: item.nombre,
          precio: item.precio
        }))
      };

      // Llamar a la API para crear el pedido
      const response = await fetch('http://localhost:8080/api/pedidos/crear-desde-carta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData)
      });

      if (!response.ok) {
        throw new Error('Error al crear el pedido');
      }

      const result = await response.json();
      console.log('Pedido creado:', result);
      
      setOrderSuccess(true);
      
      // Limpiar el carrito después de 3 segundos
      setTimeout(() => {
        onOrderComplete();
        onBackToMenu();
      }, 3000);
      
    } catch (error) {
      console.error('Error al procesar el pedido:', error);
      alert('Error al procesar el pedido. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="checkout-container">
        <div className="success-screen">
          <div className="success-icon">✅</div>
          <h2>¡Pedido Confirmado!</h2>
          <p>Tu pedido ha sido enviado al restaurante</p>
          <p>Te contactaremos pronto para confirmar los detalles</p>
          <div className="order-details">
            <p><strong>Total:</strong> {formatPrice(totalPrice)}</p>
            <p><strong>Contacto:</strong> WhatsApp</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button className="back-btn" onClick={onBack}>
          ← Volver al Carrito
        </button>
        <h2>Confirmar Pedido</h2>
      </div>

      <div className="checkout-content">
        <div className="order-summary">
          <h3>Resumen del Pedido</h3>
          <div className="order-items">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <span className="item-name">{item.nombre} x{item.quantity}</span>
                <span className="item-price">{formatPrice(item.precio * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total:</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>

        <form className="customer-form" onSubmit={handleSubmit}>
          <h3>Información de Contacto</h3>
          
          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={customerInfo.nombre}
              onChange={handleInputChange}
              required
              placeholder="Tu nombre completo"
            />
          </div>


          <div className="form-group">
            <label htmlFor="direccion">Dirección de Entrega</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={customerInfo.direccion}
              onChange={handleInputChange}
              placeholder="Dirección donde entregar (opcional)"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notas">Notas Especiales</label>
            <textarea
              id="notas"
              name="notas"
              value={customerInfo.notas}
              onChange={handleInputChange}
              placeholder="Instrucciones especiales para tu pedido (opcional)"
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-btn"
              onClick={onBack}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="confirm-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
