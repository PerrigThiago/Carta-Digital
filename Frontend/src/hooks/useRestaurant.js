import { useState, useEffect } from 'react';
import { webConfigService } from '../services/webConfigService';

export const useRestaurant = () => {
  const [restaurantInfo, setRestaurantInfo] = useState({
    nombreRestaurante: 'FrontRoti Pizza',
    direccion: 'Calle Principal 123, Ciudad',
    instagram: '@frontroti_pizza',
    horarioApertura: '09:00',
    horarioCierre: '22:00'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRestaurantInfo = async () => {
    try {
      setLoading(true);
      const info = await webConfigService.getRestaurantInfo();
      setRestaurantInfo(info);
      setError(null);
    } catch (err) {
      console.warn('Error cargando información del restaurante:', err);
      setError(err);
      // Mantener valores por defecto si hay error
    } finally {
      setLoading(false);
    }
  };

  const updateRestaurantInfo = async (newInfo) => {
    try {
      const updatedInfo = await webConfigService.updateRestaurantInfo(newInfo);
      setRestaurantInfo(updatedInfo);
      return updatedInfo;
    } catch (err) {
      console.error('Error actualizando información del restaurante:', err);
      throw err;
    }
  };

  useEffect(() => {
    loadRestaurantInfo();
    
    // Escuchar cambios en localStorage para actualizar en tiempo real
    const handleStorageChange = () => {
      try {
        const savedConfig = localStorage.getItem('restaurantConfig');
        if (savedConfig) {
          const parsedConfig = JSON.parse(savedConfig);
          setRestaurantInfo({
            nombreRestaurante: parsedConfig.nombreRestaurante || 'FrontRoti Pizza',
            direccion: parsedConfig.direccion || '',
            instagram: parsedConfig.instagram || '',
            horarioApertura: parsedConfig.horarioApertura || '09:00',
            horarioCierre: parsedConfig.horarioCierre || '22:00'
          });
        }
      } catch (error) {
        console.error('Error al cargar config desde storage:', error);
      }
    };
    
    // Agregar listener para cambios en storage
    window.addEventListener('storage', handleStorageChange);
    
    // También escuchar un evento personalizado para cambios en la misma pestaña
    const handleConfigUpdate = (event) => {
      if (event.detail) {
        setRestaurantInfo(prev => ({
          ...prev,
          ...event.detail
        }));
      }
    };
    
    window.addEventListener('restaurantConfigUpdated', handleConfigUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('restaurantConfigUpdated', handleConfigUpdate);
    };
  }, []);

  return {
    restaurantInfo,
    loading,
    error,
    loadRestaurantInfo,
    updateRestaurantInfo
  };
};
