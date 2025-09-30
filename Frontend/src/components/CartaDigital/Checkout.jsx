import React, { useState } from 'react';
import { webConfigService } from '../../services/webConfigService';
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
  const [whatsappLink, setWhatsappLink] = useState(null);
  const [pedidoId, setPedidoId] = useState(null);

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

  const generarEnlaceWhatsApp = async (pedidoId) => {
    try {
      console.log('=== GENERANDO ENLACE DE WHATSAPP ===');
      console.log('ID del pedido:', pedidoId);
      
      // Obtener número de WhatsApp configurado
      let whatsappNumber;
      try {
        whatsappNumber = await webConfigService.getWhatsappNumber();
        console.log('Número de WhatsApp obtenido:', whatsappNumber);
      } catch (apiError) {
        console.error('Error al obtener número de WhatsApp desde la API:', apiError);
        // Usar número por defecto si la API falla
        whatsappNumber = '543496447857';
        console.log('Usando número por defecto:', whatsappNumber);
      }

      if (!whatsappNumber || whatsappNumber.trim() === '') {
        console.warn('No hay número de WhatsApp configurado');
        whatsappNumber = '543496447857';
      }

      // Limpiar el número (eliminar espacios, guiones, etc)
      whatsappNumber = whatsappNumber.replace(/\D/g, '');
      console.log('Número de WhatsApp limpio:', whatsappNumber);

      // Obtener el mensaje del pedido desde el backend
      console.log('Solicitando mensaje al backend...');
      const response = await fetch(`http://localhost:8080/api/pedidos/${pedidoId}/mensaje-whatsapp`);
      console.log('Respuesta del backend:', response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error del backend:', errorText);
        throw new Error(`No se pudo obtener el mensaje del pedido: ${response.status} - ${errorText}`);
      }

      const mensaje = await response.text();
      console.log('Mensaje obtenido del backend:', mensaje);
      
      // Crear URL de WhatsApp
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
      console.log('URL de WhatsApp generada:', whatsappUrl);
      
      setWhatsappLink(whatsappUrl);
      console.log('=== ENLACE DE WHATSAPP GENERADO ===');
      
    } catch (error) {
      console.error('Error generando enlace WhatsApp:', error);
      console.error('Detalles completos del error:', error.message, error.stack);
      alert(`Error al generar enlace de WhatsApp: ${error.message}`);
    }
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

      console.log('=== ENVIANDO PEDIDO ===');
      console.log('URL:', 'http://localhost:8080/api/pedidos/crear-desde-carta');
      console.log('Datos:', pedidoData);
      console.log('JSON:', JSON.stringify(pedidoData));

      // Llamar a la API para crear el pedido
      const response = await fetch('http://localhost:8080/api/pedidos/crear-desde-carta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pedidoData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error del backend:', response.status, errorText);
        throw new Error(`Error al crear el pedido: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Pedido creado:', result);

      // Guardar ID del pedido
      setPedidoId(result.pedidoId);
      
      // Generar enlace de WhatsApp
      await generarEnlaceWhatsApp(result.pedidoId);
      
      setOrderSuccess(true);
      
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
          <p>Tu pedido #{pedidoId} ha sido creado exitosamente</p>
          <div className="order-details">
            <p><strong>Total:</strong> {formatPrice(totalPrice)}</p>
          </div>
          
          {whatsappLink ? (
            <div className="whatsapp-section">
              <p style={{ marginTop: '20px', marginBottom: '15px' }}>
                Haz clic en el botón para enviar tu pedido por WhatsApp:
              </p>
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-button"
                style={{
                  display: 'inline-block',
                  backgroundColor: '#25D366',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  marginBottom: '20px'
                }}
              >
                📱 Enviar pedido por WhatsApp
              </a>
            </div>
          ) : (
            <p style={{ marginTop: '20px' }}>Generando enlace de WhatsApp...</p>
          )}
          
          <button 
            onClick={() => {
              onOrderComplete();
              onBackToMenu();
            }}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#f0f0f0',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Volver al Menú
          </button>
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
