import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Sidebar from './Sidebar';
import Menu from './Menu';
import HistorialRanking from './HistorialRanking';
import ConfiguracionesWeb from './ConfiguracionesWeb';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuthContext();
  const { theme, changeTheme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('menu');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Función para renderizar el contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'menu':
        return <Menu />;
      case 'historial':
        return <HistorialRanking />;
      case 'configuraciones':
        return <ConfiguracionesWeb />;
      default:
        return <Menu />;
    }
  };

  // Función para manejar el logout
  const handleLogout = () => {
    logout();
  };

  // Función para alternar el estado del sidebar
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="dashboard-container">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        user={user}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />
      <main className={`dashboard-main ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <header className="dashboard-header">
          <div className="header-content">
            <h1 className="page-title">
              {activeTab === 'menu' && 'Menú Principal'}
              {activeTab === 'historial' && 'Historial y Ranking'}
              {activeTab === 'configuraciones' && 'Configuraciones Web'}
            </h1>
            <div className="user-info">
              <button 
                className="theme-toggle-btn"
                onClick={() => changeTheme(isDark ? 'claro' : 'oscuro')}
                title={`Cambiar a modo ${isDark ? 'claro' : 'oscuro'}`}
              >
                {isDark ? '☀️' : '🌙'}
              </button>
              <span className="user-name">Bienvenido, {user?.name || 'Usuario'}</span>
              <div className="user-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </div>
          </div>
        </header>
        
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
