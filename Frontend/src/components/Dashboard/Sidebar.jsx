import React from 'react';
import { useRestaurant } from '../../hooks/useRestaurant';
import './Sidebar.css';

const Sidebar = ({ activeTab, onTabChange, onLogout, user }) => {
  const { restaurantInfo } = useRestaurant();
  const menuItems = [
    {
      id: 'menu',
      label: 'Menú',
      icon: '🏠',
      description: 'Página principal'
    },
    {
      id: 'historial',
      label: 'Historial y Ranking',
      icon: '📊',
      description: 'Ver historial y rankings'
    },
    {
      id: 'resenas',
      label: 'Reseñas y Autorización',
      icon: '⭐',
      description: 'Gestionar reseñas'
    },
    {
      id: 'configuraciones',
      label: 'Configuraciones Web',
      icon: '⚙️',
      description: 'Ajustes del sistema'
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🍕</span>
          <h2 className="logo-text">{restaurantInfo.nombreRestaurante}</h2>
        </div>
        <div className="user-profile">
          <div className="user-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className="user-details">
            <span className="user-name">{user?.name || 'Usuario'}</span>
            <span className="user-email">{user?.email || 'usuario@email.com'}</span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
                title={item.description}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={onLogout}>
          <span className="logout-icon">🚪</span>
          <span className="logout-text">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
