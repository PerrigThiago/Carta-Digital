import { apiConfig } from '../config/apiConfig';

const API_BASE_URL = apiConfig.baseURL;

// Servicio para manejar las llamadas a la API de historial y ranking
export const historialRankingService = {
  // Obtener estadísticas generales
  async obtenerEstadisticas() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pedidos/estadisticas`);
      if (!response.ok) {
        throw new Error('Error al obtener estadísticas');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerEstadisticas:', error);
      throw error;
    }
  },

  // Obtener ranking de productos
  async obtenerRankingProductos() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pedidos/ranking-productos`);
      if (!response.ok) {
        throw new Error('Error al obtener ranking de productos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerRankingProductos:', error);
      throw error;
    }
  },

  // Obtener historial reciente de pedidos
  async obtenerHistorialReciente(limite = 10) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pedidos/historial-reciente?limite=${limite}`);
      if (!response.ok) {
        throw new Error('Error al obtener historial reciente');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerHistorialReciente:', error);
      throw error;
    }
  },

  // Obtener pedidos por estado
  async obtenerPedidosPorEstado(estado) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pedidos/estado/${estado}`);
      if (!response.ok) {
        throw new Error('Error al obtener pedidos por estado');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerPedidosPorEstado:', error);
      throw error;
    }
  },

  // Obtener pedidos por fecha
  async obtenerPedidosPorFecha(fecha) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/pedidos/fecha?fecha=${fecha}`);
      if (!response.ok) {
        throw new Error('Error al obtener pedidos por fecha');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en obtenerPedidosPorFecha:', error);
      throw error;
    }
  }
};
