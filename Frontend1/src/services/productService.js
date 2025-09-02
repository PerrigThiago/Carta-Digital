import { apiClient } from '../utils/auth';

export const productService = {
  // Obtener todos los productos
  getAllProducts: async () => {
    try {
      return await apiClient.get('/productos');
    } catch (error) {
      console.error('Error obteniendo productos:', error);
      throw error;
    }
  },

  // Obtener producto por ID
  getProductById: async (id) => {
    try {
      return await apiClient.get(`/productos/${id}`);
    } catch (error) {
      console.error('Error obteniendo producto:', error);
      throw error;
    }
  },

  // Crear nuevo producto
  createProduct: async (productData) => {
    try {
      return await apiClient.post('/productos', productData);
    } catch (error) {
      console.error('Error creando producto:', error);
      throw error;
    }
  },

  // Actualizar producto existente
  updateProduct: async (id, productData) => {
    try {
      return await apiClient.put(`/productos/${id}`, productData);
    } catch (error) {
      console.error('Error actualizando producto:', error);
      throw error;
    }
  },

  // Eliminar producto
  deleteProduct: async (id) => {
    try {
      return await apiClient.delete(`/productos/${id}`);
    } catch (error) {
      console.error('Error eliminando producto:', error);
      throw error;
    }
  },

  // Obtener productos por grupo
  getProductsByGroup: async (group) => {
    try {
      const products = await apiClient.get('/productos');
      return products.filter(product => product.grupo === group);
    } catch (error) {
      console.error('Error obteniendo productos por grupo:', error);
      throw error;
    }
  },

  // Obtener productos por subgrupo
  getProductsBySubGroup: async (subGroup) => {
    try {
      const products = await apiClient.get('/productos');
      return products.filter(product => product.subGrupo === subGroup);
    } catch (error) {
      console.error('Error obteniendo productos por subgrupo:', error);
      throw error;
    }
  }
};
