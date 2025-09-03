import React, { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Sidebar from './Sidebar';
import Menu from './Menu';
import HistorialRanking from './HistorialRanking';
import ResenasAutorizacion from './ResenasAutorizacion';
import ConfiguracionesWeb from './ConfiguracionesWeb';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuthContext();
  const { theme, changeTheme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('menu');

  // Función para renderizar el contenido según la pestaña activa
  const renderContent = () => {
    switch (activeTab) {
      case 'menu':
        return <Menu />;
      case 'historial':
        return <HistorialRanking />;
      case 'resenas':
        return <ResenasAutorizacion />;
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

  return (
    <div className="dashboard-container">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        user={user}
      />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1 className="page-title">
              {activeTab === 'menu' && 'Menú Principal'}
              {activeTab === 'historial' && 'Historial y Ranking'}
              {activeTab === 'resenas' && 'Reseñas y Autorización'}
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
