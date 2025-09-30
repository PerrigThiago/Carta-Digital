import { apiConfig } from '../config/apiConfig';

const API_BASE_URL = apiConfig.baseURL;

export const productService = {
  // Obtener todos los productos
  async getAllProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/productos`);
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getAllProducts:', error);
      throw error;
    }
  },

  // Obtener productos disponibles (para la carta pública)
  async getAvailableProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/productos/disponibles`);
      if (!response.ok) {
        throw new Error('Error al obtener productos disponibles');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getAvailableProducts:', error);
      throw error;
    }
  },

  // Obtener productos por grupo/categoría
  async getProductsByGroup(group) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/productos/grupo/${encodeURIComponent(group)}`);
      if (!response.ok) {
        throw new Error('Error al obtener productos por grupo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getProductsByGroup:', error);
      throw error;
    }
  },

  // Buscar productos por nombre
  async searchProducts(searchTerm) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/productos/buscar?nombre=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Error al buscar productos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en searchProducts:', error);
      throw error;
    }
  },

  // Obtener producto por ID
  async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/productos/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener producto');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getProductById:', error);
      throw error;
    }
  },

  // Obtener estadísticas de productos
  async getProductStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/productos/estadisticas`);
      if (!response.ok) {
        throw new Error('Error al obtener estadísticas');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getProductStats:', error);
      throw error;
    }
  }
};