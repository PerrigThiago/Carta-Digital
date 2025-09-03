import { apiClient } from '../utils/auth';

export const orderService = {
  // Obtener todos los pedidos
  getAllOrders: async () => {
    try {
      return await apiClient.get('/pedidos');
    } catch (error) {
      console.error('Error obteniendo pedidos:', error);
      throw error;
    }
  },

  // Obtener pedido por ID
  getOrderById: async (id) => {
    try {
      return await apiClient.get(`/pedidos/${id}`);
    } catch (error) {
      console.error('Error obteniendo pedido:', error);
      throw error;
    }
  },

  // Crear nuevo pedido
  createOrder: async (orderData) => {
    try {
      return await apiClient.post('/pedidos', orderData);
    } catch (error) {
      console.error('Error creando pedido:', error);
      throw error;
    }
  },

  // Actualizar estado del pedido
  updateOrderStatus: async (id, status) => {
    try {
      return await apiClient.put(`/pedidos/${id}`, { estado: status });
    } catch (error) {
      console.error('Error actualizando estado del pedido:', error);
      throw error;
    }
  },

  // Eliminar pedido
  deleteOrder: async (id) => {
    try {
      return await apiClient.delete(`/pedidos/${id}`);
    } catch (error) {
      console.error('Error eliminando pedido:', error);
      throw error;
    }
  },

  // Obtener pedidos por cliente
  getOrdersByClient: async (clientId) => {
    try {
      const orders = await apiClient.get('/pedidos');
      return orders.filter(order => order.cliente?.id === clientId);
    } catch (error) {
      console.error('Error obteniendo pedidos por cliente:', error);
      throw error;
    }
  },

  // Obtener pedidos por estado
  getOrdersByStatus: async (status) => {
    try {
      const orders = await apiClient.get('/pedidos');
      return orders.filter(order => order.estado === status);
    } catch (error) {
      console.error('Error obteniendo pedidos por estado:', error);
      throw error;
    }
  }
};
