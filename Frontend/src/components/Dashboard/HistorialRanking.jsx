import React, { useState } from 'react';
import './HistorialRanking.css';

const HistorialRanking = () => {
  const [activeTab, setActiveTab] = useState('historial');

  // Datos de ejemplo para el historial
  const historialData = [
    { id: 1, fecha: '2024-01-15', cliente: 'Juan Pérez', pedido: 'Pizza Margherita', total: '$15.99', estado: 'Completado' },
    { id: 2, fecha: '2024-01-15', cliente: 'María García', pedido: 'Pizza Pepperoni', total: '$18.99', estado: 'En Proceso' },
    { id: 3, fecha: '2024-01-14', cliente: 'Carlos López', pedido: 'Pizza Hawaiana', total: '$16.99', estado: 'Completado' },
    { id: 4, fecha: '2024-01-14', cliente: 'Ana Martínez', pedido: 'Pizza Vegetariana', total: '$17.99', estado: 'Completado' },
    { id: 5, fecha: '2024-01-13', cliente: 'Luis Rodríguez', pedido: 'Pizza BBQ', total: '$19.99', estado: 'Completado' }
  ];

  // Datos de ejemplo para el ranking
  const rankingData = [
    { posicion: 1, producto: 'Pizza Margherita', ventas: 45, rating: 4.8 },
    { posicion: 2, producto: 'Pizza Pepperoni', ventas: 38, rating: 4.7 },
    { posicion: 3, producto: 'Pizza Hawaiana', ventas: 32, rating: 4.6 },
    { posicion: 4, producto: 'Pizza Vegetariana', ventas: 28, rating: 4.5 },
    { posicion: 5, producto: 'Pizza BBQ', ventas: 25, rating: 4.4 }
  ];

  // Datos de ejemplo para estadísticas
  const estadisticas = [
    { label: 'Total Ventas', value: '$8,450', cambio: '+12%', positivo: true },
    { label: 'Pedidos Totales', value: '156', cambio: '+8%', positivo: true },
    { label: 'Tiempo Promedio', value: '25 min', cambio: '-5%', positivo: false }
  ];

  return (
    <div className="historial-ranking-container">
      {/* Tabs de navegación */}
      <div className="tabs-navigation">
        <button 
          className={`tab-button ${activeTab === 'historial' ? 'active' : ''}`}
          onClick={() => setActiveTab('historial')}
        >
          📋 Historial de Pedidos
        </button>
        <button 
          className={`tab-button ${activeTab === 'ranking' ? 'active' : ''}`}
          onClick={() => setActiveTab('ranking')}
        >
          🏆 Ranking de Productos
        </button>
        <button 
          className={`tab-button ${activeTab === 'estadisticas' ? 'active' : ''}`}
          onClick={() => setActiveTab('estadisticas')}
        >
          📊 Estadísticas
        </button>
      </div>

      {/* Contenido de Historial */}
      {activeTab === 'historial' && (
        <div className="tab-content">
          <div className="content-header">
            <h3>Historial de Pedidos Recientes</h3>
            <div className="filters">
              <select className="filter-select">
                <option value="">Todos los estados</option>
                <option value="completado">Completado</option>
                <option value="en-proceso">En Proceso</option>
                <option value="cancelado">Cancelado</option>
              </select>
              <input 
                type="date" 
                className="date-filter"
                defaultValue="2024-01-15"
              />
            </div>
          </div>
          
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Pedido</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {historialData.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>#{pedido.id}</td>
                    <td>{pedido.fecha}</td>
                    <td>{pedido.cliente}</td>
                    <td>{pedido.pedido}</td>
                    <td>{pedido.total}</td>
                    <td>
                      <span className={`status-badge status-${pedido.estado.toLowerCase().replace(' ', '-')}`}>
                        {pedido.estado}
                      </span>
                    </td>
                    <td>
                      <button className="action-btn view-btn">👁️</button>
                      <button className="action-btn edit-btn">✏️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contenido de Ranking */}
      {activeTab === 'ranking' && (
        <div className="tab-content">
          <div className="content-header">
            <h3>Top 5 Productos Más Vendidos</h3>
            <p className="subtitle">Basado en ventas del último mes</p>
          </div>
          
          <div className="ranking-list">
            {rankingData.map((item) => (
              <div key={item.posicion} className="ranking-item">
                <div className="ranking-position">
                  <span className="position-number">{item.posicion}</span>
                  <span className="position-medal">
                    {item.posicion === 1 ? '🥇' : item.posicion === 2 ? '🥈' : item.posicion === 3 ? '🥉' : '🏅'}
                  </span>
                </div>
                <div className="ranking-info">
                  <h4 className="product-name">{item.producto}</h4>
                  <div className="product-stats">
                    <span className="sales-count">Ventas: {item.ventas}</span>
                    <span className="rating">Rating: {item.rating} ⭐</span>
                  </div>
                </div>
                <div className="ranking-actions">
                  <button className="btn-secondary">Ver Detalles</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contenido de Estadísticas */}
      {activeTab === 'estadisticas' && (
        <div className="tab-content">
          <div className="content-header">
            <h3>Estadísticas Generales</h3>
            <p className="subtitle">Resumen del rendimiento del negocio</p>
            <button className="reportes-button" onClick={() => console.log('Generando reportes...')}>
              📊 Generar Reportes
            </button>
          </div>
          
          <div className="stats-grid">
            {estadisticas.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-header">
                  <h4>{stat.label}</h4>
                  <span className={`change-indicator ${stat.positivo ? 'positive' : 'negative'}`}>
                    {stat.cambio}
                  </span>
                </div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-chart">
                  <div className="chart-bar" style={{ width: `${Math.random() * 100}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="chart-section">
            <h4>Gráfico de Ventas</h4>
            <div className="chart-placeholder">
              <p>📈 Gráfico de ventas mensuales</p>
              <p>Aquí se mostraría un gráfico interactivo</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialRanking;
