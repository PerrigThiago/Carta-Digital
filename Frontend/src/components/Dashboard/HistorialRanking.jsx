import React, { useState } from 'react';
import { useHistorialRanking } from '../../hooks/useHistorialRanking';
import './HistorialRanking.css';

const HistorialRanking = () => {
  const [activeTab, setActiveTab] = useState('historial');
  
  // Usar el hook personalizado para manejar datos
  const {
    loading,
    error,
    estadisticas,
    rankingProductos,
    historialPedidos,
    filtros,
    filtrarPorEstado,
    filtrarPorFecha,
    limpiarFiltros
  } = useHistorialRanking();

  // Función para formatear fecha
  const formatearFecha = (fecha) => {
    if (!fecha) return 'N/A';
    return new Date(fecha).toLocaleDateString('es-ES');
  };

  // Función para formatear precio
  const formatearPrecio = (precio) => {
    if (!precio) return '$0';
    return `$${precio.toLocaleString()}`;
  };

  // Función para obtener el nombre del cliente
  const obtenerNombreCliente = (pedido) => {
    if (pedido.cliente && pedido.cliente.nombre) {
      return pedido.cliente.nombre;
    }
    return 'Cliente Anónimo';
  };

  // Función para obtener el estado en español
  const obtenerEstadoEnEspanol = (estado) => {
    const estados = {
      'PENDIENTE': 'Pendiente',
      'CONFIRMADO': 'Confirmado',
      'EN_PREPARACION': 'En Preparación',
      'LISTO': 'Listo',
      'ENTREGADO': 'Entregado',
      'CANCELADO': 'Cancelado'
    };
    return estados[estado] || estado;
  };

  // Función para obtener la clase CSS del estado
  const obtenerClaseEstado = (estado) => {
    const clases = {
      'PENDIENTE': 'status-pendiente',
      'CONFIRMADO': 'status-confirmado',
      'EN_PREPARACION': 'status-en-proceso',
      'LISTO': 'status-listo',
      'ENTREGADO': 'status-completado',
      'CANCELADO': 'status-cancelado'
    };
    return clases[estado] || 'status-pendiente';
  };

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
              <select 
                className="filter-select"
                value={filtros.estado}
                onChange={(e) => filtrarPorEstado(e.target.value)}
              >
                <option value="">Todos los estados</option>
                <option value="PENDIENTE">Pendiente</option>
                <option value="CONFIRMADO">Confirmado</option>
                <option value="EN_PREPARACION">En Preparación</option>
                <option value="LISTO">Listo</option>
                <option value="ENTREGADO">Entregado</option>
                <option value="CANCELADO">Cancelado</option>
              </select>
              <input 
                type="date" 
                className="date-filter"
                value={filtros.fecha}
                onChange={(e) => filtrarPorFecha(e.target.value)}
              />
              <button 
                className="btn-secondary"
                onClick={limpiarFiltros}
              >
                Limpiar Filtros
              </button>
            </div>
          </div>
          
          {loading && (
            <div className="loading-container">
              <p>Cargando datos...</p>
            </div>
          )}
          
          {error && (
            <div className="error-container">
              <p>Error: {error}</p>
              <button onClick={() => window.location.reload()}>Reintentar</button>
            </div>
          )}
          
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Fecha</th>
                  <th>Cliente</th>
                  <th>Total</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {historialPedidos.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-data">
                      No hay pedidos disponibles
                    </td>
                  </tr>
                ) : (
                  historialPedidos.map((pedido) => (
                    <tr key={pedido.id}>
                      <td>#{pedido.id}</td>
                      <td>{formatearFecha(pedido.fecha)}</td>
                      <td>{obtenerNombreCliente(pedido)}</td>
                      <td>{formatearPrecio(pedido.total)}</td>
                      <td>
                        <span className={`status-badge ${obtenerClaseEstado(pedido.estado)}`}>
                          {obtenerEstadoEnEspanol(pedido.estado)}
                        </span>
                      </td>
                      <td>
                        <button className="action-btn edit-btn" title="Editar">✏️</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Contenido de Ranking */}
      {activeTab === 'ranking' && (
        <div className="tab-content">
          <div className="content-header">
            <h3>Top Productos Más Vendidos</h3>
            <p className="subtitle">Basado en ventas totales</p>
          </div>
          
          {loading && (
            <div className="loading-container">
              <p>Cargando ranking...</p>
            </div>
          )}
          
          {error && (
            <div className="error-container">
              <p>Error: {error}</p>
              <button onClick={() => window.location.reload()}>Reintentar</button>
            </div>
          )}
          
          <div className="ranking-list">
            {rankingProductos.length === 0 ? (
              <div className="no-data">
                <p>No hay datos de ranking disponibles</p>
              </div>
            ) : (
              rankingProductos.map((item, index) => (
                <div key={item.productoId} className="ranking-item">
                  <div className="ranking-position">
                    <span className="position-number">{index + 1}</span>
                    <span className="position-medal">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                    </span>
                  </div>
                  <div className="ranking-info">
                    <h4 className="product-name">{item.nombre}</h4>
                    <div className="product-stats">
                      <span className="sales-count">Ventas: {item.ventas}</span>
                      <span className="rating">Rating: {item.rating?.toFixed(1) || 'N/A'} ⭐</span>
                      <span className="ingresos">Ingresos: {formatearPrecio(item.ingresos)}</span>
                    </div>
                  </div>
                  <div className="ranking-actions">
                    <button className="btn-secondary">Ver Detalles</button>
                  </div>
                </div>
              ))
            )}
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
          
          {loading && (
            <div className="loading-container">
              <p>Cargando estadísticas...</p>
            </div>
          )}
          
          {error && (
            <div className="error-container">
              <p>Error: {error}</p>
              <button onClick={() => window.location.reload()}>Reintentar</button>
            </div>
          )}
          
          {estadisticas && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <h4>Total Ventas</h4>
                  <span className={`change-indicator ${estadisticas.cambioVentas > 0 ? 'positive' : 'negative'}`}>
                    {estadisticas.cambioVentas > 0 ? '+' : ''}{estadisticas.cambioVentas}%
                  </span>
                </div>
                <div className="stat-value">{formatearPrecio(estadisticas.totalVentas)}</div>
                <div className="stat-chart">
                  <div className="chart-bar" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-header">
                  <h4>Pedidos Totales</h4>
                  <span className={`change-indicator ${estadisticas.cambioPedidos > 0 ? 'positive' : 'negative'}`}>
                    {estadisticas.cambioPedidos > 0 ? '+' : ''}{estadisticas.cambioPedidos}%
                  </span>
                </div>
                <div className="stat-value">{estadisticas.totalPedidos}</div>
                <div className="stat-chart">
                  <div className="chart-bar" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-header">
                  <h4>Tiempo Promedio</h4>
                  <span className={`change-indicator ${estadisticas.cambioTiempo < 0 ? 'positive' : 'negative'}`}>
                    {estadisticas.cambioTiempo > 0 ? '+' : ''}{estadisticas.cambioTiempo}%
                  </span>
                </div>
                <div className="stat-value">{estadisticas.tiempoPromedio} min</div>
                <div className="stat-chart">
                  <div className="chart-bar" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-header">
                  <h4>Pedidos Completados</h4>
                  <span className="change-indicator positive">
                    {estadisticas.pedidosCompletados > 0 ? 
                      `${Math.round((estadisticas.pedidosCompletados / estadisticas.totalPedidos) * 100)}%` : 
                      '0%'
                    }
                  </span>
                </div>
                <div className="stat-value">{estadisticas.pedidosCompletados}</div>
                <div className="stat-chart">
                  <div className="chart-bar" style={{ 
                    width: `${estadisticas.totalPedidos > 0 ? 
                      (estadisticas.pedidosCompletados / estadisticas.totalPedidos) * 100 : 0
                    }%` 
                  }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div className="chart-section">
            <h4>Resumen de Actividad</h4>
            <div className="chart-placeholder">
              <p>📈 Gráfico de ventas mensuales</p>
              <p>Aquí se mostraría un gráfico interactivo con datos reales</p>
              {estadisticas && (
                <div className="summary-stats">
                  <p>Total de ingresos: {formatearPrecio(estadisticas.totalVentas)}</p>
                  <p>Promedio por pedido: {estadisticas.totalPedidos > 0 ? 
                    formatearPrecio(Math.round(estadisticas.totalVentas / estadisticas.totalPedidos)) : 
                    '$0'
                  }</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialRanking;

