import { apiConfig } from '../config/apiConfig';

const API_BASE_URL = apiConfig.baseURL;

export const clientService = {
  // Crear cliente
  async createClient(clientData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clientes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData)
      });
      
      if (!response.ok) {
        throw new Error('Error al crear cliente');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en createClient:', error);
      throw error;
    }
  },

  // Obtener cliente por ID
  async getClientById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clientes/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener cliente');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getClientById:', error);
      throw error;
    }
  },

  // Buscar cliente por teléfono
  async findClientByPhone(phone) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clientes/buscar?telefono=${encodeURIComponent(phone)}`);
      if (!response.ok) {
        throw new Error('Error al buscar cliente');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en findClientByPhone:', error);
      throw error;
    }
  },

  // Buscar cliente por nombre
  async findClientByName(name) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clientes/nombre?nombre=${encodeURIComponent(name)}`);
      if (!response.ok) {
        throw new Error('Error al buscar cliente por nombre');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en findClientByName:', error);
      throw error;
    }
  },

  // Actualizar cliente
  async updateClient(id, clientData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clientData)
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar cliente');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en updateClient:', error);
      throw error;
    }
  },

  // Obtener todos los clientes
  async getAllClients() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/clientes`);
      if (!response.ok) {
        throw new Error('Error al obtener clientes');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getAllClients:', error);
      throw error;
    }
  }
};