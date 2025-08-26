import React, { useState } from 'react';
import './ConfiguracionesWeb.css';

const ConfiguracionesWeb = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [configData, setConfigData] = useState({
    nombreRestaurante: 'FrontRoti Pizza',
    direccion: 'Calle Principal 123, Ciudad',
    telefono: '+1 234 567 8900',
    email: 'info@frontroti.com',
    horarioApertura: '09:00',
    horarioCierre: '22:00',
    moneda: 'USD',
    zonaHoraria: 'America/New_York',
    idioma: 'es',
    tema: 'claro'
  });

  const [notificaciones, setNotificaciones] = useState({
    emailPedidos: true,
    emailResenas: true,
    smsConfirmacion: false,
    pushNotificaciones: true,
    recordatorios: true
  });

  const [seguridad, setSeguridad] = useState({
    autenticacionDosFactores: false,
    sesionesSimultaneas: true,
    tiempoExpiracionSesion: 30,
    registroUsuarios: true,
    verificarEmail: true
  });

  const handleConfigChange = (key, value) => {
    setConfigData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleNotificacionChange = (key, value) => {
    setNotificaciones(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSeguridadChange = (key, value) => {
    setSeguridad(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveConfig = () => {
    console.log('Guardando configuración:', configData);
    // Aquí iría la lógica para guardar en el backend
    alert('Configuración guardada exitosamente');
  };

  const handleBackup = () => {
    console.log('Creando backup del sistema');
    alert('Backup iniciado. Te notificaremos cuando esté listo.');
  };

  const handleRestore = () => {
    console.log('Restaurando sistema desde backup');
    alert('Restauración iniciada. El sistema se reiniciará.');
  };

  return (
    <div className="configuraciones-web-container">
      {/* Tabs de navegación */}
      <div className="tabs-navigation">
        <button 
          className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          ⚙️ Configuración General
        </button>
        <button 
          className={`tab-button ${activeTab === 'notificaciones' ? 'active' : ''}`}
          onClick={() => setActiveTab('notificaciones')}
        >
          🔔 Notificaciones
        </button>
        <button 
          className={`tab-button ${activeTab === 'seguridad' ? 'active' : ''}`}
          onClick={() => setActiveTab('seguridad')}
        >
          🔒 Seguridad
        </button>
        <button 
          className={`tab-button ${activeTab === 'backup' ? 'active' : ''}`}
          onClick={() => setActiveTab('backup')}
        >
          💾 Backup y Restauración
        </button>
      </div>

      {/* Configuración General */}
      {activeTab === 'general' && (
        <div className="tab-content">
          <div className="content-header">
            <h3>Configuración General del Sistema</h3>
            <p className="subtitle">Información básica del restaurante y preferencias</p>
          </div>
          
          <div className="config-form">
            <div className="form-section">
              <h4>Información del Restaurante</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre del Restaurante</label>
                  <input
                    type="text"
                    value={configData.nombreRestaurante}
                    onChange={(e) => handleConfigChange('nombreRestaurante', e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Dirección</label>
                  <input
                    type="text"
                    value={configData.direccion}
                    onChange={(e) => handleConfigChange('direccion', e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    value={configData.telefono}
                    onChange={(e) => handleConfigChange('telefono', e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={configData.email}
                    onChange={(e) => handleConfigChange('email', e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Horarios y Configuración Regional</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Horario de Apertura</label>
                  <input
                    type="time"
                    value={configData.horarioApertura}
                    onChange={(e) => handleConfigChange('horarioApertura', e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Horario de Cierre</label>
                  <input
                    type="time"
                    value={configData.horarioCierre}
                    onChange={(e) => handleConfigChange('horarioCierre', e.target.value)}
                    className="form-control"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Moneda</label>
                  <select
                    value={configData.moneda}
                    onChange={(e) => handleConfigChange('moneda', e.target.value)}
                    className="form-control"
                  >
                    <option value="USD">USD - Dólar Estadounidense</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="MXN">MXN - Peso Mexicano</option>
                    <option value="ARS">ARS - Peso Argentino</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Zona Horaria</label>
                  <select
                    value={configData.zonaHoraria}
                    onChange={(e) => handleConfigChange('zonaHoraria', e.target.value)}
                    className="form-control"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="America/Mexico_City">Ciudad de México</option>
                    <option value="America/Argentina/Buenos_Aires">Buenos Aires</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Preferencias de Interfaz</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Idioma</label>
                  <select
                    value={configData.idioma}
                    onChange={(e) => handleConfigChange('idioma', e.target.value)}
                    className="form-control"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tema</label>
                  <select
                    value={configData.tema}
                    onChange={(e) => handleConfigChange('tema', e.target.value)}
                    className="form-control"
                  >
                    <option value="claro">Claro</option>
                    <option value="oscuro">Oscuro</option>
                    <option value="auto">Automático</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configuración de Notificaciones */}
      {activeTab === 'notificaciones' && (
        <div className="tab-content">
          <div className="content-header">
            <h3>Configuración de Notificaciones</h3>
            <p className="subtitle">Gestiona cómo y cuándo recibir notificaciones</p>
          </div>
          
          <div className="notifications-config">
            <div className="notification-section">
              <h4>Notificaciones por Email</h4>
              <div className="notification-item">
                <label className="switch-label">
                  <input
                    type="checkbox"
                    checked={notificaciones.emailPedidos}
                    onChange={(e) => handleNotificacionChange('emailPedidos', e.target.checked)}
                  />
                  <span className="switch"></span>
                  Notificaciones de nuevos pedidos
                </label>
                <p className="notification-description">
                  Recibe un email cada vez que se realice un nuevo pedido
                </p>
              </div>
              
              <div className="notification-item">
                <label className="switch-label">
                  <input
                    type="checkbox"
                    checked={notificaciones.emailResenas}
                    onChange={(e) => handleNotificacionChange('emailResenas', e.target.checked)}
                  />
                  <span className="switch"></span>
                  Notificaciones de nuevas reseñas
                </label>
                <p className="notification-description">
                  Recibe un email cuando un cliente deje una reseña
                </p>
              </div>
            </div>

            <div className="notification-section">
              <h4>Notificaciones por SMS</h4>
              <div className="notification-item">
                <label className="switch-label">
                  <input
                    type="checkbox"
                    checked={notificaciones.smsConfirmacion}
                    onChange={(e) => handleNotificacionChange('smsConfirmacion', e.target.checked)}
                  />
                  <span className="switch"></span>
                  Confirmaciones por SMS
                </label>
                <p className="notification-description">
                  Envía confirmaciones de pedidos por mensaje de texto
                </p>
              </div>
            </div>

            <div className="notification-section">
              <h4>Notificaciones del Sistema</h4>
              <div className="notification-item">
                <label className="switch-label">
                  <input
                    type="checkbox"
                    checked={notificaciones.pushNotificaciones}
                    onChange={(e) => handleNotificacionChange('pushNotificaciones', e.target.checked)}
                  />
                  <span className="switch"></span>
                  Notificaciones push del navegador
                </label>
                <p className="notification-description">
                  Recibe notificaciones en tiempo real en tu navegador
                </p>
              </div>
              
              <div className="notification-item">
                <label className="switch-label">
                  <input
                    type="checkbox"
                    checked={notificaciones.recordatorios}
                    onChange={(e) => handleNotificacionChange('recordatorios', e.target.checked)}
                  />
                  <span className="switch"></span>
                  Recordatorios y alertas
                </label>
                <p className="notification-description">
                  Recibe recordatorios de tareas pendientes y alertas importantes
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configuración de Seguridad */}
      {activeTab === 'seguridad' && (
        <div className="tab-content">
          <div className="content-header">
            <h3>Configuración de Seguridad</h3>
            <p className="subtitle">Gestiona la seguridad de tu cuenta y sistema</p>
          </div>
          
          <div className="security-config">
            <div className="security-section">
              <h4>Autenticación</h4>
              <div className="security-item">
                <label className="switch-label">
                  <input
                    type="checkbox"
                    checked={seguridad.autenticacionDosFactores}
                    onChange={(e) => handleSeguridadChange('autenticacionDosFactores', e.target.checked)}
                  />
                  <span className="switch"></span>
                  Autenticación de dos factores (2FA)
                </label>
                <p className="security-description">
                  Agrega una capa extra de seguridad a tu cuenta
                </p>
              </div>
              
              <div className="security-item">
                <label className="switch-label">
                  <input
                    type="checkbox"
                    checked={seguridad.sesionesSimultaneas}
                    onChange={(e) => handleSeguridadChange('sesionesSimultaneas', e.target.checked)}
                  />
                  <span className="switch"></span>
                  Permitir múltiples sesiones
                </label>
                <p className="security-description">
                  Accede desde múltiples dispositivos simultáneamente
                </p>
              </div>
            </div>

            <div className="security-section">
              <h4>Gestión de Sesiones</h4>
              <div className="security-item">
                <label>Tiempo de expiración de sesión (minutos)</label>
                <select
                  value={seguridad.tiempoExpiracionSesion}
                  onChange={(e) => handleSeguridadChange('tiempoExpiracionSesion', parseInt(e.target.value))}
                  className="form-control"
                >
                  <option value={15}>15 minutos</option>
                  <option value={30}>30 minutos</option>
                  <option value={60}>1 hora</option>
                  <option value={120}>2 horas</option>
                  <option value={480}>8 horas</option>
                </select>
                <p className="security-description">
                  Después de este tiempo, deberás volver a iniciar sesión
                </p>
              </div>
            </div>

            <div className="security-section">
              <h4>Registro de Usuarios</h4>
              <div className="security-item">
                <label className="switch-label">
                  <input
                    type="checkbox"
                    checked={seguridad.registroUsuarios}
                    onChange={(e) => handleSeguridadChange('registroUsuarios', e.target.checked)}
                  />
                  <span className="switch"></span>
                  Permitir registro de nuevos usuarios
                </label>
                <p className="security-description">
                  Los usuarios podrán crear cuentas por su cuenta
                </p>
              </div>
              
              <div className="security-item">
                <label className="switch-label">
                  <input
                    type="checkbox"
                    checked={seguridad.verificarEmail}
                    onChange={(e) => handleSeguridadChange('verificarEmail', e.target.checked)}
                  />
                  <span className="switch"></span>
                  Verificación de email obligatoria
                </label>
                <p className="security-description">
                  Los usuarios deben verificar su email antes de usar la cuenta
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backup y Restauración */}
      {activeTab === 'backup' && (
        <div className="tab-content">
          <div className="content-header">
            <h3>Backup y Restauración</h3>
            <p className="subtitle">Gestiona copias de seguridad y restauración del sistema</p>
          </div>
          
          <div className="backup-section">
            <div className="backup-info">
              <h4>Estado del Sistema</h4>
              <div className="backup-status">
                <div className="status-item">
                  <span className="status-label">Último backup:</span>
                  <span className="status-value">Hace 2 horas</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Tamaño del backup:</span>
                  <span className="status-value">2.4 GB</span>
                </div>
                <div className="status-item">
                  <span className="status-label">Estado:</span>
                  <span className="status-value status-success">Completado</span>
                </div>
              </div>
            </div>

            <div className="backup-actions">
              <div className="action-card">
                <h5>Crear Backup</h5>
                <p>Crea una copia de seguridad completa del sistema</p>
                <button className="btn-primary" onClick={handleBackup}>
                  🔄 Crear Backup
                </button>
              </div>
              
              <div className="action-card">
                <h5>Restaurar Sistema</h5>
                <p>Restaura el sistema desde un backup anterior</p>
                <button className="btn-warning" onClick={handleRestore}>
                  ⚠️ Restaurar Sistema
                </button>
              </div>
            </div>

            <div className="backup-history">
              <h4>Historial de Backups</h4>
              <div className="backup-list">
                <div className="backup-item">
                  <span className="backup-date">2024-01-15 14:30</span>
                  <span className="backup-size">2.4 GB</span>
                  <span className="backup-status success">Completado</span>
                </div>
                <div className="backup-item">
                  <span className="backup-date">2024-01-14 14:30</span>
                  <span className="backup-size">2.3 GB</span>
                  <span className="backup-status success">Completado</span>
                </div>
                <div className="backup-item">
                  <span className="backup-date">2024-01-13 14:30</span>
                  <span className="backup-size">2.2 GB</span>
                  <span className="backup-status success">Completado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botones de acción */}
      <div className="config-actions">
        <button className="btn-secondary" onClick={() => setConfigData({
          nombreRestaurante: 'FrontRoti Pizza',
          direccion: 'Calle Principal 123, Ciudad',
          telefono: '+1 234 567 8900',
          email: 'info@frontroti.com',
          horarioApertura: '09:00',
          horarioCierre: '22:00',
          moneda: 'USD',
          zonaHoraria: 'America/New_York',
          idioma: 'es',
          tema: 'claro'
        })}>
          🔄 Restaurar Valores
        </button>
        <button className="btn-primary" onClick={handleSaveConfig}>
          💾 Guardar Cambios
        </button>
      </div>
    </div>
  );
};

export default ConfiguracionesWeb;
