import React, { useState, useEffect } from 'react';
import { webConfigService } from '../../services/webConfigService';
import './ConfiguracionesWeb.css';

const ConfiguracionesWeb = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Datos por defecto
  const defaultConfigData = {
    nombreRestaurante: 'FrontRoti Pizza',
    direccion: 'Calle Principal 123, Ciudad',
    instagram: '@frontroti_pizza',
    horarioApertura: '09:00',
    horarioCierre: '22:00',
    whatsappNumber: '549349644787'
  };

  const [configData, setConfigData] = useState(defaultConfigData);

  // Funciones para manejar localStorage
  const saveConfigToStorage = (data) => {
    try {
      localStorage.setItem('restaurantConfig', JSON.stringify(data));
      console.log('Configuración guardada en localStorage:', data);
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
    }
  };

  const loadConfigFromStorage = () => {
    try {
      const savedConfig = localStorage.getItem('restaurantConfig');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        console.log('Configuración cargada desde localStorage:', parsedConfig);
        return parsedConfig;
      }
    } catch (error) {
      console.error('Error al cargar desde localStorage:', error);
    }
    return defaultConfigData;
  };

  // Cargar datos al inicializar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        // Cargar información del restaurante desde la API
        const restaurantInfo = await webConfigService.getRestaurantInfo();
        console.log('Información del restaurante cargada:', restaurantInfo);
        
        // Cargar número de WhatsApp desde la API
        const whatsappNumber = await webConfigService.getWhatsappNumber();
        console.log('Número de WhatsApp cargado:', whatsappNumber);
        
        // Actualizar el estado con los datos de la API
        setConfigData({
          nombreRestaurante: restaurantInfo.nombreRestaurante || defaultConfigData.nombreRestaurante,
          direccion: restaurantInfo.direccion || defaultConfigData.direccion,
          instagram: restaurantInfo.instagram || defaultConfigData.instagram,
          horarioApertura: restaurantInfo.horarioApertura || defaultConfigData.horarioApertura,
          horarioCierre: restaurantInfo.horarioCierre || defaultConfigData.horarioCierre,
          whatsappNumber: whatsappNumber || defaultConfigData.whatsappNumber
        });
        
        // Guardar en localStorage como backup
        saveConfigToStorage({
          nombreRestaurante: restaurantInfo.nombreRestaurante || defaultConfigData.nombreRestaurante,
          direccion: restaurantInfo.direccion || defaultConfigData.direccion,
          instagram: restaurantInfo.instagram || defaultConfigData.instagram,
          horarioApertura: restaurantInfo.horarioApertura || defaultConfigData.horarioApertura,
          horarioCierre: restaurantInfo.horarioCierre || defaultConfigData.horarioCierre,
          whatsappNumber: whatsappNumber || defaultConfigData.whatsappNumber
        });
        
      } catch (error) {
        console.warn('Error cargando datos desde la API, usando localStorage:', error);
        // Fallback a localStorage si la API falla
        const savedConfig = loadConfigFromStorage();
        setConfigData(savedConfig);
      }
    };
    
    loadData();
  }, []);


  const handleConfigChange = (key, value) => {
    setConfigData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const validateConfig = () => {
    const errors = [];
    
    if (!configData.nombreRestaurante.trim()) {
      errors.push('El nombre del restaurante es requerido');
    }
    
    if (!configData.direccion.trim()) {
      errors.push('La dirección es requerida');
    }
    
    if (!configData.instagram.trim()) {
      errors.push('El Instagram es requerido');
    } else if (!/^@?[a-zA-Z0-9._]+$/.test(configData.instagram.trim())) {
      errors.push('El Instagram no tiene un formato válido (ej: @usuario o usuario)');
    }
    
    if (!configData.horarioApertura) {
      errors.push('El horario de apertura es requerido');
    }
    
    if (!configData.horarioCierre) {
      errors.push('El horario de cierre es requerido');
    }
    
    if (configData.horarioApertura && configData.horarioCierre) {
      if (configData.horarioApertura >= configData.horarioCierre) {
        errors.push('El horario de apertura debe ser anterior al horario de cierre');
      }
    }

    // Validar WhatsApp en formato internacional sin símbolos
    if (configData.whatsappNumber && /\D/.test(configData.whatsappNumber)) {
      errors.push('El número de WhatsApp debe contener solo dígitos (formato internacional)');
    }
    if (configData.whatsappNumber && configData.whatsappNumber.length < 8) {
      errors.push('El número de WhatsApp parece demasiado corto');
    }
    
    return errors;
  };

  const handleSaveConfig = async () => {
    // Validar datos
    const errors = validateConfig();
    if (errors.length > 0) {
      setSaveMessage(`❌ Errores encontrados: ${errors.join(', ')}`);
      setTimeout(() => setSaveMessage(''), 5000);
      return;
    }

    setIsSaving(true);
    setSaveMessage('');

    try {
      // Preparar datos del restaurante (sin whatsappNumber)
      const restaurantData = {
        nombreRestaurante: configData.nombreRestaurante,
        direccion: configData.direccion,
        instagram: configData.instagram,
        horarioApertura: configData.horarioApertura,
        horarioCierre: configData.horarioCierre
      };
      
      // Guardar información del restaurante en la API
      await webConfigService.updateRestaurantInfo(restaurantData);
      console.log('Información del restaurante guardada:', restaurantData);
      
      // Guardar en localStorage como backup
      saveConfigToStorage(configData);
      
      setSaveMessage('✅ Configuración guardada exitosamente');
      setTimeout(() => setSaveMessage(''), 3000);
      pushToast('success', 'Configuración guardada correctamente');
      
    } catch (error) {
      console.error('Error al guardar configuración:', error);
      setSaveMessage('❌ Error al guardar la configuración');
      setTimeout(() => setSaveMessage(''), 5000);
      pushToast('error', 'Error al guardar la configuración');
    } finally {
      setIsSaving(false);
    }
  };

  const [toasts, setToasts] = useState([]);

  const pushToast = (type, message) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };


  const handleBackup = () => {
    console.log('Creando backup del sistema');
    alert('Backup iniciado. Te notificaremos cuando esté listo.');
  };

  const handleRestore = () => {
    console.log('Restaurando sistema desde backup');
    alert('Restauración iniciada. El sistema se reiniciará.');
  };

  const handleResetConfig = () => {
    if (window.confirm('¿Estás seguro de que quieres restaurar la configuración a los valores por defecto? Esta acción no se puede deshacer.')) {
      setConfigData(defaultConfigData);
      saveConfigToStorage(defaultConfigData);
      setSaveMessage('✅ Configuración restaurada a valores por defecto');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };


  return (
    <div className="configuraciones-web-container">
      {/* Toasts */}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type}`}>
            <span>{t.message}</span>
            <button className="toast-close" onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}>✕</button>
          </div>
        ))}
      </div>
      {/* Tabs de navegación */}
      <div className="tabs-navigation">
        <button 
          className={`tab-button ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          ⚙️ Configuración General
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
                <div className="form-group" style={{ flex: 1, marginRight: '10px' }}>
                  <label>Instagram</label>
                  <input
                    type="text"
                    value={configData.instagram}
                    onChange={(e) => handleConfigChange('instagram', e.target.value)}
                    placeholder="@usuario_o_nombre"
                    className="form-control"
                  />
                </div>

                <div className="form-group" style={{ flex: 1, marginLeft: '10px' }}>
                  <label>Número de WhatsApp (formato internacional, solo dígitos)</label>
                  <input
                    type="tel"
                    value={configData.whatsappNumber}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, '');
                      handleConfigChange('whatsappNumber', digitsOnly);
                    }}
                    placeholder="Ej: 549349644787 (con 9 inicial)"
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Horarios</h4>
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
            </div>
            
            {/* Botones de acción */}
            <div className="form-actions">
              <div className="action-buttons">
                <button 
                  className="btn-save" 
                  onClick={handleSaveConfig}
                  disabled={isSaving}
                >
                  {isSaving ? '⏳ Guardando...' : '💾 Guardar Configuración'}
                </button>
                <button 
                  className="btn-reset" 
                  onClick={handleResetConfig}
                  disabled={isSaving}
                >
                  🔄 Restaurar Valores por Defecto
                </button>
              </div>
              {saveMessage && (
                <div className={`save-message ${saveMessage.includes('✅') ? 'success' : 'error'}`}>
                  {saveMessage}
                </div>
              )}
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
    </div>
  );
};

export default ConfiguracionesWeb;