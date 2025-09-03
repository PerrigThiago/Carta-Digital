import { apiClient } from '../utils/auth';

export const clientService = {
  // Obtener todos los clientes
  getAllClients: async () => {
    try {
      return await apiClient.get('/clientes');
    } catch (error) {
      console.error('Error obteniendo clientes:', error);
      throw error;
    }
  },

  // Obtener cliente por ID
  getClientById: async (id) => {
    try {
      return await apiClient.get(`/clientes/${id}`);
    } catch (error) {
      console.error('Error obteniendo cliente:', error);
      throw error;
    }
  },

  // Crear nuevo cliente
  createClient: async (clientData) => {
    try {
      return await apiClient.post('/clientes', clientData);
    } catch (error) {
      console.error('Error creando cliente:', error);
      throw error;
    }
  },

  // Actualizar cliente existente
  updateClient: async (id, clientData) => {
    try {
      return await apiClient.put(`/clientes/${id}`, clientData);
    } catch (error) {
      console.error('Error actualizando cliente:', error);
      throw error;
    }
  },

  // Eliminar cliente
  deleteClient: async (id) => {
    try {
      return await apiClient.delete(`/clientes/${id}`);
    } catch (error) {
      console.error('Error eliminando cliente:', error);
      throw error;
    }
  },

  // Buscar clientes por nombre
  searchClientsByName: async (name) => {
    try {
      const clients = await apiClient.get('/clientes');
      return clients.filter(client => 
        client.nombre.toLowerCase().includes(name.toLowerCase())
      );
    } catch (error) {
      console.error('Error buscando clientes:', error);
      throw error;
    }
  },

  // Buscar clientes por teléfono
  searchClientsByPhone: async (phone) => {
    try {
      const clients = await apiClient.get('/clientes');
      return clients.filter(client => 
        client.telefono.includes(phone)
      );
    } catch (error) {
      console.error('Error buscando clientes por teléfono:', error);
      throw error;
    }
  }
};
