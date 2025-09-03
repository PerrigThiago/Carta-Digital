import React, { useState } from 'react';
import './ResenasAutorizacion.css';

const ResenasAutorizacion = () => {
  const [activeTab, setActiveTab] = useState('resenas');
  const [selectedResena, setSelectedResena] = useState(null);

  // Datos de ejemplo para reseñas
  const resenasData = [
    { 
      id: 1, 
      cliente: 'María García', 
      producto: 'Pizza Margherita', 
      rating: 5, 
      comentario: 'Excelente pizza, muy fresca y deliciosa. La masa está perfecta.',
      fecha: '2024-01-15',
      estado: 'Aprobada',
      respuesta: 'Gracias por tu comentario, nos alegra que hayas disfrutado.'
    },
    { 
      id: 2, 
      cliente: 'Juan Pérez', 
      producto: 'Pizza Pepperoni', 
      rating: 4, 
      comentario: 'Muy buena pizza, pero podría tener más pepperoni.',
      fecha: '2024-01-14',
      estado: 'Pendiente',
      respuesta: null
    },
    { 
      id: 3, 
      cliente: 'Ana López', 
      producto: 'Pizza Hawaiana', 
      rating: 3, 
      comentario: 'La pizza estaba fría cuando llegó. Sabor regular.',
      fecha: '2024-01-13',
      estado: 'Rechazada',
      respuesta: 'Lamentamos la experiencia. Te contactaremos para resolverlo.'
    },
    { 
      id: 4, 
      cliente: 'Carlos Ruiz', 
      producto: 'Pizza Vegetariana', 
      rating: 5, 
      comentario: 'Perfecta para vegetarianos. Ingredientes frescos y sabrosos.',
      fecha: '2024-01-12',
      estado: 'Aprobada',
      respuesta: 'Nos encanta que disfrutes nuestras opciones vegetarianas.'
    }
  ];

  // Datos de ejemplo para autorizaciones
  const autorizacionesData = [
    { 
      id: 1, 
      tipo: 'Descuento', 
      cliente: 'María García', 
      monto: '$5.00', 
      motivo: 'Cliente frecuente',
      fecha: '2024-01-15',
      estado: 'Aprobada',
      aprobadoPor: 'Admin'
    },
    { 
      id: 2, 
      tipo: 'Reembolso', 
      cliente: 'Juan Pérez', 
      monto: '$18.99', 
      motivo: 'Producto defectuoso',
      fecha: '2024-01-14',
      estado: 'Pendiente',
      aprobadoPor: null
    },
    { 
      id: 3, 
      tipo: 'Descuento', 
      cliente: 'Ana López', 
      monto: '$3.00', 
      motivo: 'Primera compra',
      fecha: '2024-01-13',
      estado: 'Rechazada',
      aprobadoPor: 'Manager'
    }
  ];

  const handleResenaAction = (resenaId, action) => {
    console.log(`Acción ${action} en reseña ${resenaId}`);
    // Aquí iría la lógica para aprobar/rechazar reseñas
  };

  const handleAutorizacionAction = (authId, action) => {
    console.log(`Acción ${action} en autorización ${authId}`);
    // Aquí iría la lógica para aprobar/rechazar autorizaciones
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const getStatusColor = (estado) => {
    switch (estado.toLowerCase()) {
      case 'aprobada': return 'success';
      case 'pendiente': return 'warning';
      case 'rechazada': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="resenas-autorizacion-container">
      {/* Tabs de navegación */}
      <div className="tabs-navigation">
        <button 
          className={`tab-button ${activeTab === 'resenas' ? 'active' : ''}`}
          onClick={() => setActiveTab('resenas')}
        >
          ⭐ Reseñas de Clientes
        </button>
        <button 
          className={`tab-button ${activeTab === 'autorizaciones' ? 'active' : ''}`}
          onClick={() => setActiveTab('autorizaciones')}
        >
          🔐 Autorizaciones
        </button>
      </div>

      {/* Contenido de Reseñas */}
      {activeTab === 'resenas' && (
        <div className="tab-content">
          <div className="content-header">
            <h3>Gestión de Reseñas</h3>
            <div className="filters">
              <select className="filter-select">
                <option value="">Todos los estados</option>
                <option value="aprobada">Aprobadas</option>
                <option value="pendiente">Pendientes</option>
                <option value="rechazada">Rechazadas</option>
              </select>
              <select className="filter-select">
                <option value="">Todos los ratings</option>
                <option value="5">5 estrellas</option>
                <option value="4">4 estrellas</option>
                <option value="3">3 estrellas</option>
                <option value="2">2 estrellas</option>
                <option value="1">1 estrella</option>
              </select>
            </div>
          </div>
          
          <div className="resenas-grid">
            {resenasData.map((resena) => (
              <div key={resena.id} className="resena-card">
                <div className="resena-header">
                  <div className="resena-info">
                    <h4 className="cliente-nombre">{resena.cliente}</h4>
                    <span className="producto-nombre">{resena.producto}</span>
                    <div className="rating-display">
                      {getRatingStars(resena.rating)}
                      <span className="rating-number">({resena.rating}/5)</span>
                    </div>
                  </div>
                  <div className="resena-meta">
                    <span className={`status-badge status-${getStatusColor(resena.estado)}`}>
                      {resena.estado}
                    </span>
                    <span className="fecha">{resena.fecha}</span>
                  </div>
                </div>
                
                <div className="resena-content">
                  <p className="comentario">{resena.comentario}</p>
                  
                  {resena.respuesta && (
                    <div className="respuesta">
                      <strong>Respuesta:</strong> {resena.respuesta}
                    </div>
                  )}
                </div>
                
                <div className="resena-actions">
                  {resena.estado === 'Pendiente' && (
                    <>
                      <button 
                        className="btn-success"
                        onClick={() => handleResenaAction(resena.id, 'aprobar')}
                      >
                        ✅ Aprobar
                      </button>
                      <button 
                        className="btn-danger"
                        onClick={() => handleResenaAction(resena.id, 'rechazar')}
                      >
                        ❌ Rechazar
                      </button>
                    </>
                  )}
                  <button 
                    className="btn-secondary"
                    onClick={() => setSelectedResena(resena)}
                  >
                    ✏️ Editar
                  </button>
                  <button className="btn-info">
                    👁️ Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contenido de Autorizaciones */}
      {activeTab === 'autorizaciones' && (
        <div className="tab-content">
          <div className="content-header">
            <h3>Gestión de Autorizaciones</h3>
            <p className="subtitle">Aprobaciones pendientes y procesadas</p>
          </div>
          
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Cliente</th>
                  <th>Monto</th>
                  <th>Motivo</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Aprobado Por</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {autorizacionesData.map((auth) => (
                  <tr key={auth.id}>
                    <td>#{auth.id}</td>
                    <td>
                      <span className={`tipo-badge tipo-${auth.tipo.toLowerCase()}`}>
                        {auth.tipo}
                      </span>
                    </td>
                    <td>{auth.cliente}</td>
                    <td>{auth.monto}</td>
                    <td>{auth.motivo}</td>
                    <td>{auth.fecha}</td>
                    <td>
                      <span className={`status-badge status-${getStatusColor(auth.estado)}`}>
                        {auth.estado}
                      </span>
                    </td>
                    <td>{auth.aprobadoPor || '-'}</td>
                    <td>
                      {auth.estado === 'Pendiente' && (
                        <>
                          <button 
                            className="action-btn success-btn"
                            onClick={() => handleAutorizacionAction(auth.id, 'aprobar')}
                            title="Aprobar"
                          >
                            ✅
                          </button>
                          <button 
                            className="action-btn danger-btn"
                            onClick={() => handleAutorizacionAction(auth.id, 'rechazar')}
                            title="Rechazar"
                          >
                            ❌
                          </button>
                        </>
                      )}
                      <button className="action-btn info-btn" title="Ver Detalles">
                        👁️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal para editar reseña */}
      {selectedResena && (
        <div className="modal-overlay" onClick={() => setSelectedResena(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Editar Reseña</h3>
              <button className="modal-close" onClick={() => setSelectedResena(null)}>
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p><strong>Cliente:</strong> {selectedResena.cliente}</p>
              <p><strong>Producto:</strong> {selectedResena.producto}</p>
              <p><strong>Rating:</strong> {getRatingStars(selectedResena.rating)}</p>
              <p><strong>Comentario:</strong> {selectedResena.comentario}</p>
              
              <div className="form-group">
                <label>Respuesta:</label>
                <textarea 
                  className="form-control"
                  defaultValue={selectedResena.respuesta || ''}
                  placeholder="Escribe una respuesta..."
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setSelectedResena(null)}>
                Cancelar
              </button>
              <button className="btn-primary">
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResenasAutorizacion;
