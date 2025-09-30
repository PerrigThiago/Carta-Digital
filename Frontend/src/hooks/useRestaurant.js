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
  }, []);

  return {
    restaurantInfo,
    loading,
    error,
    loadRestaurantInfo,
    updateRestaurantInfo
  };
};
