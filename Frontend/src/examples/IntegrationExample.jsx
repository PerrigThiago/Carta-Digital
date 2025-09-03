import React from 'react';
import { useProducts } from '../hooks/useProducts';
import { useOrders } from '../hooks/useOrders';
import { useCart } from '../hooks/useCart';
import { useClients } from '../hooks/useClients';
import { useWebConfig } from '../hooks/useWebConfig';
import { ORDER_STATUS, PRODUCT_GROUPS } from '../config/apiConfig';

/**
 * Ejemplo de uso de todos los hooks integrados
 * Este componente demuestra cómo usar la integración completa
 */
const IntegrationExample = () => {
  // Hooks para diferentes entidades
  const products = useProducts();
  const orders = useOrders();
  const cart = useCart();
  const clients = useClients();
  const webConfig = useWebConfig();

  // Función para crear un producto de ejemplo
  const handleCreateProduct = async () => {
    try {
      const newProduct = await products.createProduct({
        nombre: 'Producto Ejemplo',
        precio: 1500,
        cantidad: 10,
        grupo: 'COMIDA',
        subGrupo: 'PLATOS_PRINCIPALES',
        descripcion: 'Descripción del producto ejemplo',
        disponibilidad: true
      });
      console.log('Producto creado:', newProduct);
    } catch (error) {
      console.error('Error creando producto:', error);
    }
  };

  // Función para crear un pedido de ejemplo
  const handleCreateOrder = async () => {
    try {
      const newOrder = await orders.createOrder({
        fechaCreacion: new Date().toISOString(),
        estado: 'PENDIENTE',
        total: 3000,
        cliente: { id: 1 }, // Asumiendo que existe un cliente con ID 1
        pedidoProductos: [
          {
            producto: { id: 1 }, // Asumiendo que existe un producto con ID 1
            cantidad: 2,
            precioUnitario: 1500
          }
        ]
      });
      console.log('Pedido creado:', newOrder);
    } catch (error) {
      console.error('Error creando pedido:', error);
    }
    }
  };

  // Función para agregar producto al carrito
  const handleAddToCart = async (productId) => {
    try {
      await cart.addToCart(productId, 1);
      console.log('Producto agregado al carrito');
    } catch (error) {
      console.error('Error agregando al carrito:', error);
    }
  };

  // Función para crear un cliente de ejemplo
  const handleCreateClient = async () => {
    try {
      const newClient = await clients.createClient({
        nombre: 'Cliente Ejemplo',
        email: 'cliente@ejemplo.com',
        telefono: '123456789',
        direccion: 'Dirección ejemplo 123'
      });
      console.log('Cliente creado:', newClient);
    } catch (error) {
      console.error('Error creando cliente:', error);
    }
  };

  // Función para crear un parámetro web de ejemplo
  const handleCreateWebParam = async () => {
    try {
      const newParam = await webConfig.createWebParam({
        clave: 'TITULO_SITIO',
        valor: 'Carta Digital - Rotisería',
        descripcion: 'Título principal del sitio web',
        grupo: 'GENERAL'
      });
      console.log('Parámetro web creado:', newParam);
    } catch (error) {
      console.error('Error creando parámetro web:', error);
    }
  };

  return (
    <div className="integration-example">
      <h1>Ejemplo de Integración Completa</h1>
      
      {/* Sección de Productos */}
      <section className="products-section">
        <h2>Gestión de Productos</h2>
        <div className="stats">
          <p>Total de productos: {products.products.length}</p>
          <p>Productos filtrados: {products.filteredProducts.length}</p>
          <p>Estado: {products.loading ? 'Cargando...' : 'Listo'}</p>
          {products.error && <p className="error">Error: {products.error}</p>}
        </div>
        
        <div className="actions">
          <button onClick={handleCreateProduct} disabled={products.loading}>
            Crear Producto de Ejemplo
          </button>
          
          <div className="filters">
            <select 
              value={products.filters.group} 
              onChange={(e) => products.updateFilters({ group: e.target.value })}
            >
              <option value="">Todos los grupos</option>
              {products.getUniqueGroups().map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
            
            <input
              type="text"
              placeholder="Buscar productos..."
              value={products.filters.searchTerm}
              onChange={(e) => products.updateFilters({ searchTerm: e.target.value })}
            />
            
            <button onClick={products.clearFilters}>Limpiar Filtros</button>
          </div>
        </div>
        
        <div className="products-list">
          {products.filteredProducts.slice(0, 5).map(product => (
            <div key={product.id} className="product-item">
              <h4>{product.nombre}</h4>
              <p>Precio: ${product.precio}</p>
              <p>Grupo: {product.grupo}</p>
              <button onClick={() => handleAddToCart(product.id)}>
                Agregar al Carrito
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Pedidos */}
      <section className="orders-section">
        <h2>Gestión de Pedidos</h2>
        <div className="stats">
          <p>Total de pedidos: {orders.orders.length}</p>
          <p>Estado: {orders.loading ? 'Cargando...' : 'Listo'}</p>
          {orders.error && <p className="error">Error: {orders.error}</p>}
        </div>
        
        <div className="actions">
          <button onClick={handleCreateOrder} disabled={orders.loading}>
            Crear Pedido de Ejemplo
          </button>
        </div>
        
        <div className="order-stats">
          {(() => {
            const stats = orders.getOrderStats();
            return (
              <div className="stats-grid">
                <div>Total: {stats.total}</div>
                <div>Pendientes: {stats.pending}</div>
                <div>En Proceso: {stats.inProgress}</div>
                <div>Listos: {stats.ready}</div>
                <div>Entregados: {stats.delivered}</div>
                <div>Cancelados: {stats.cancelled}</div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Sección del Carrito */}
      <section className="cart-section">
        <h2>Carrito de Compras</h2>
        <div className="stats">
          <p>Total de items: {cart.cartItems.length}</p>
          <p>Total: ${cart.total}</p>
          <p>Estado: {cart.loading ? 'Cargando...' : 'Listo'}</p>
          {cart.error && <p className="error">Error: {cart.error}</p>}
        </div>
        
        <div className="cart-items">
          {cart.cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <h4>{item.producto.nombre}</h4>
              <p>Cantidad: {item.cantidad}</p>
              <p>Precio: ${item.producto.precio}</p>
              <div className="quantity-controls">
                <button onClick={() => cart.updateQuantity(item.id, item.cantidad - 1)}>
                  -
                </button>
                <span>{item.cantidad}</span>
                <button onClick={() => cart.updateQuantity(item.id, item.cantidad + 1)}>
                  +
                </button>
                <button onClick={() => cart.removeFromCart(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-actions">
          <button onClick={cart.clearCart} disabled={cart.cartItems.length === 0}>
            Limpiar Carrito
          </button>
        </div>
      </section>

      {/* Sección de Clientes */}
      <section className="clients-section">
        <h2>Gestión de Clientes</h2>
        <div className="stats">
          <p>Total de clientes: {clients.clients.length}</p>
          <p>Estado: {clients.loading ? 'Cargando...' : 'Listo'}</p>
          {clients.error && <p className="error">Error: {clients.error}</p>}
        </div>
        
        <div className="actions">
          <button onClick={handleCreateClient} disabled={clients.loading}>
            Crear Cliente de Ejemplo
          </button>
        </div>
      </section>

      {/* Sección de Configuración Web */}
      <section className="web-config-section">
        <h2>Configuración Web</h2>
        <div className="stats">
          <p>Total de parámetros: {webConfig.webParams.length}</p>
          <p>Estado: {webConfig.loading ? 'Cargando...' : 'Listo'}</p>
          {webConfig.error && <p className="error">Error: {webConfig.error}</p>}
        </div>
        
        <div className="actions">
          <button onClick={handleCreateWebParam} disabled={webConfig.loading}>
            Crear Parámetro Web de Ejemplo
          </button>
        </div>
        
        <div className="web-params">
          {webConfig.filteredParams.slice(0, 3).map(param => (
            <div key={param.id} className="param-item">
              <h4>{param.clave}</h4>
              <p>Valor: {param.valor}</p>
              <p>Grupo: {param.grupo}</p>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .integration-example {
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        section {
          margin-bottom: 30px;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
        }
        
        .stats {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 15px;
        }
        
        .actions {
          margin-bottom: 15px;
        }
        
        .actions button {
          margin-right: 10px;
          padding: 8px 16px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .actions button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        
        .filters {
          margin-top: 10px;
        }
        
        .filters select,
        .filters input {
          margin-right: 10px;
          padding: 5px;
        }
        
        .error {
          color: red;
          font-weight: bold;
        }
        
        .products-list,
        .cart-items,
        .web-params {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 15px;
          margin-top: 15px;
        }
        
        .product-item,
        .cart-item,
        .param-item {
          border: 1px solid #eee;
          padding: 15px;
          border-radius: 5px;
        }
        
        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 10px;
        }
        
        .quantity-controls button {
          padding: 5px 10px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 3px;
          cursor: pointer;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 10px;
          margin-top: 15px;
        }
        
        .stats-grid > div {
          background: #e9ecef;
          padding: 10px;
          text-align: center;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default IntegrationExample;
