import React, { useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [showMenuTable, setShowMenuTable] = useState(false);
  
  // Datos de ejemplo para las estadísticas
  const stats = [
    { label: 'Pedidos Hoy', value: '24', icon: '📦', color: 'blue' },
    { label: 'Ventas del Mes', value: '$2,450', icon: '💰', color: 'green' },
    { label: 'Reseñas', value: '4.8', icon: '⭐', color: 'orange' }
  ];

  // Datos de ejemplo para el menú de productos - ahora en estado local
  const [menuProducts, setMenuProducts] = useState([
    { id: 1, categoria: 'Pizzas', nombre: 'Pizza Margherita', precio: '$15.99', disponible: true },
    { id: 2, categoria: 'Pizzas', nombre: 'Pizza Pepperoni', precio: '$18.99', disponible: true },
    { id: 3, categoria: 'Pizzas', nombre: 'Pizza Hawaiana', precio: '$16.99', disponible: false },
    { id: 4, categoria: 'Pizzas', nombre: 'Pizza Vegetariana', precio: '$17.99', disponible: true },
    { id: 5, categoria: 'Pizzas', nombre: 'Pizza BBQ', precio: '$19.99', disponible: true },
    { id: 6, categoria: 'Pizzas', nombre: 'Pizza Cuatro Quesos', precio: '$20.99', disponible: true },
    { id: 7, categoria: 'Pizzas', nombre: 'Pizza Mexicana', precio: '$18.99', disponible: false },
    { id: 8, categoria: 'Bebidas', nombre: 'Coca Cola', precio: '$2.50', disponible: true },
    { id: 9, categoria: 'Bebidas', nombre: 'Agua Mineral', precio: '$1.99', disponible: true },
    { id: 10, categoria: 'Bebidas', nombre: 'Limonada', precio: '$3.50', disponible: true },
    { id: 11, categoria: 'Bebidas', nombre: 'Té Helado', precio: '$2.99', disponible: false },
    { id: 12, categoria: 'Bebidas', nombre: 'Jugo de Naranja', precio: '$3.99', disponible: true },
    { id: 13, categoria: 'Bebidas', nombre: 'Cerveza', precio: '$4.99', disponible: true },
    { id: 14, categoria: 'Postres', nombre: 'Tiramisú', precio: '$8.99', disponible: true },
    { id: 15, categoria: 'Postres', nombre: 'Cheesecake', precio: '$7.99', disponible: false },
    { id: 16, categoria: 'Postres', nombre: 'Flan', precio: '$6.99', disponible: true },
    { id: 17, categoria: 'Postres', nombre: 'Helado', precio: '$4.99', disponible: true },
    { id: 18, categoria: 'Postres', nombre: 'Brownie', precio: '$5.99', disponible: true },
    { id: 19, categoria: 'Entradas', nombre: 'Bruschetta', precio: '$6.99', disponible: true },
    { id: 20, categoria: 'Entradas', nombre: 'Ensalada César', precio: '$8.99', disponible: true },
    { id: 21, categoria: 'Entradas', nombre: 'Sopa del Día', precio: '$5.99', disponible: true },
    { id: 22, categoria: 'Entradas', nombre: 'Palitos de Ajo', precio: '$4.99', disponible: true },
    { id: 23, categoria: 'Entradas', nombre: 'Alitas de Pollo', precio: '$9.99', disponible: false }
  ]);

  // Función para manejar cambios en la disponibilidad
  const handleDisponibilidadChange = (productId, disponible) => {
    setMenuProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, disponible: disponible }
          : product
      )
    );
    console.log(`Producto ${productId} - Disponibilidad: ${disponible}`);
    // Aquí iría la lógica para actualizar en el backend
  };

  const quickActions = [
    { label: 'Ver Menú', icon: '🍽️', action: 'menu' },
    { label: 'Categorías', icon: '📂', action: 'categorias' },
    { label: 'Productos', icon: '🍕', action: 'productos' }
  ];

  const renderActionButtons = (action) => {
    // Si es "Ver Menú", mostrar como botón que despliega la tabla
    if (action.label === 'Ver Menú') {
      return (
        <div className="action-item">
          <div className="action-header">
            <span className="action-icon">{action.icon}</span>
            <span className="action-label">{action.label}</span>
          </div>
          <button 
            className="menu-toggle-btn"
            onClick={() => setShowMenuTable(!showMenuTable)}
          >
            {showMenuTable ? 'Ocultar Menú' : 'Mostrar Menú'}
          </button>
        </div>
      );
    }
    
    // Para Categorías y Productos, mostrar botones
    return (
      <div className="action-item">
        <div className="action-header">
          <span className="action-icon">{action.icon}</span>
          <span className="action-label">{action.label}</span>
        </div>
        <div className="action-buttons">
          <button 
            className="action-btn add-btn" 
            onClick={() => console.log(`Agregar ${action.label}`)}
            title={`Agregar ${action.label}`}
          >
            ➕
          </button>
          <button 
            className="action-btn edit-btn" 
            onClick={() => console.log(`Editar ${action.label}`)}
            title={`Editar ${action.label}`}
          >
            ✏️
          </button>
          <button 
            className="action-btn delete-btn" 
            onClick={() => console.log(`Borrar ${action.label}`)}
            title={`Borrar ${action.label}`}
          >
            🗑️
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="menu-container">
      {/* Sección de bienvenida */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h2 className="welcome-title">¡Bienvenido a tu Dashboard!</h2>
          <p className="welcome-subtitle">
            Gestiona tu restaurante de manera eficiente desde un solo lugar
          </p>
        </div>
        <div className="welcome-illustration">
          <span className="welcome-emoji">🎉</span>
        </div>
      </div>

      {/* Estadísticas principales */}
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className={`stat-card stat-${stat.color}`}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Acciones rápidas */}
      <div className="quick-actions-section">
        <h3 className="section-title">Acciones Rápidas</h3>
        <div className="actions-grid">
          {quickActions.map((action, index) => (
            <div key={index} className="action-container">
              {renderActionButtons(action)}
            </div>
          ))}
        </div>
      </div>

      {/* Tabla del menú de productos */}
      {showMenuTable && (
        <div className="menu-table-section">
          <div className="table-header">
            <h3 className="section-title">Menú de Productos</h3>
            <div className="table-info">
              <span className="product-count">
                Mostrando {Math.min(10, menuProducts.length)} de {menuProducts.length} productos
              </span>
            </div>
          </div>
          <div className="table-container">
            <table className="menu-table">
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Disponible</th>
                </tr>
              </thead>
              <tbody>
                {menuProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.categoria}</td>
                    <td>{product.nombre}</td>
                    <td>{product.precio}</td>
                    <td>
                      <input
                        type="checkbox"
                        checked={product.disponible}
                        onChange={() => handleDisponibilidadChange(product.id, !product.disponible)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Información del sistema */}
      <div className="system-info">
        <div className="info-card">
          <h4>Estado del Sistema</h4>
          <div className="status-indicators">
            <div className="status-item status-online">
              <span className="status-dot"></span>
              <span>Sistema Online</span>
            </div>
            <div className="status-item status-online">
              <span className="status-dot"></span>
              <span>Base de Datos Conectada</span>
            </div>
            <div className="status-item status-online">
              <span className="status-dot"></span>
              <span>API Funcionando</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
