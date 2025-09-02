import { apiClient } from '../utils/auth';

export const webConfigService = {
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
  }
};
