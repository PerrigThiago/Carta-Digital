import { apiClient } from '../utils/auth';

export const webConfigService = {
  // WhatsApp number helpers
  getWhatsappNumber: async () => {
    try {
      return await apiClient.get('/parametros/whatsapp-number');
    } catch (error) {
      console.error('Error obteniendo whatsappNumber:', error);
      throw error;
    }
  },

  updateWhatsappNumber: async (number) => {
    try {
      // Enviamos como query param para coincidir con el backend (@RequestParam)
      return await apiClient.put(`/parametros/whatsapp-number?number=${encodeURIComponent(number)}`, {});
    } catch (error) {
      console.error('Error actualizando whatsappNumber:', error);
      throw error;
    }
  },
  // Obtener todos los parámetros web
  getAllWebParams: async () => {
    try {
      return await apiClient.get('/parametros-web');
    } catch (error) {
      console.error('Error obteniendo parámetros web:', error);
      throw error;
    }
  },

  // Obtener parámetro por ID
  getWebParamById: async (id) => {
    try {
      return await apiClient.get(`/parametros-web/${id}`);
    } catch (error) {
      console.error('Error obteniendo parámetro web:', error);
      throw error;
    }
  },

  // Crear nuevo parámetro web
  createWebParam: async (paramData) => {
    try {
      return await apiClient.post('/parametros-web', paramData);
    } catch (error) {
      console.error('Error creando parámetro web:', error);
      throw error;
    }
  },

  // Actualizar parámetro web existente
  updateWebParam: async (id, paramData) => {
    try {
      return await apiClient.put(`/parametros-web/${id}`, paramData);
    } catch (error) {
      console.error('Error actualizando parámetro web:', error);
      throw error;
    }
  },

  // Eliminar parámetro web
  deleteWebParam: async (id) => {
    try {
      return await apiClient.delete(`/parametros-web/${id}`);
    } catch (error) {
      console.error('Error eliminando parámetro web:', error);
      throw error;
    }
  },

  // Obtener parámetro por clave
  getWebParamByKey: async (key) => {
    try {
      const params = await apiClient.get('/parametros-web');
      return params.find(param => param.clave === key);
    } catch (error) {
      console.error('Error obteniendo parámetro por clave:', error);
      throw error;
    }
  },

  // Obtener parámetros por grupo
  getWebParamsByGroup: async (group) => {
    try {
      const params = await apiClient.get('/parametros-web');
      return params.filter(param => param.grupo === group);
    } catch (error) {
      console.error('Error obteniendo parámetros por grupo:', error);
      throw error;
    }
  },

  // ===== FUNCIONES DE RESTAURANTE =====
  
  // Obtener toda la información del restaurante
  getRestaurantInfo: async () => {
    try {
      return await apiClient.get('/restaurante/info');
    } catch (error) {
      console.error('Error obteniendo información del restaurante:', error);
      throw error;
    }
  },

  // Actualizar toda la información del restaurante
  updateRestaurantInfo: async (restaurantData) => {
    try {
      return await apiClient.put('/restaurante/info', restaurantData);
    } catch (error) {
      console.error('Error actualizando información del restaurante:', error);
      throw error;
    }
  },

  // Obtener solo el nombre del restaurante
  getRestaurantName: async () => {
    try {
      return await apiClient.get('/restaurante/nombre');
    } catch (error) {
      console.error('Error obteniendo nombre del restaurante:', error);
      throw error;
    }
  },

  // Obtener solo la dirección del restaurante
  getRestaurantAddress: async () => {
    try {
      return await apiClient.get('/restaurante/direccion');
    } catch (error) {
      console.error('Error obteniendo dirección del restaurante:', error);
      throw error;
    }
  },

  // Obtener solo el Instagram del restaurante
  getRestaurantInstagram: async () => {
    try {
      return await apiClient.get('/restaurante/instagram');
    } catch (error) {
      console.error('Error obteniendo Instagram del restaurante:', error);
      throw error;
    }
  },

  // Obtener los horarios del restaurante
  getRestaurantHours: async () => {
    try {
      return await apiClient.get('/restaurante/horarios');
    } catch (error) {
      console.error('Error obteniendo horarios del restaurante:', error);
      throw error;
    }
  }
};
