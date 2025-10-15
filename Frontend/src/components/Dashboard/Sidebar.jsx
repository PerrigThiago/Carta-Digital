import React from 'react';
import { useRestaurant } from '../../hooks/useRestaurant';
import './Sidebar.css';

const Sidebar = ({ activeTab, onTabChange, onLogout, user, isCollapsed, onToggleCollapse }) => {
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
      id: 'configuraciones',
      label: 'Configuraciones Web',
      icon: '⚙️',
      description: 'Ajustes del sistema'
    }
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-header-top">
          <div className="logo">
            <span className="logo-icon">🍕</span>
            {!isCollapsed && <h2 className="logo-text">{restaurantInfo.nombreRestaurante}</h2>}
          </div>
          <button 
            className="sidebar-toggle-btn" 
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            {isCollapsed ? '☰' : '✕'}
          </button>
        </div>
        {!isCollapsed && (
          <div className="user-profile">
            <div className="user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="user-details">
              <span className="user-name">{user?.name || 'Usuario'}</span>
            </div>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-button ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => onTabChange(item.id)}
                title={isCollapsed ? item.label : item.description}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-button" onClick={onLogout} title="Cerrar Sesión">
          <span className="logout-icon">🚪</span>
          {!isCollapsed && <span className="logout-text">Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
