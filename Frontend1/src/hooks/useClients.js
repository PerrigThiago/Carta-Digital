import { useState, useEffect, useCallback } from 'react';
import { clientService } from '../services/clientService';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredClients, setFilteredClients] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    phone: ''
  });

  // Cargar todos los clientes
  const loadClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await clientService.getAllClients();
      setClients(data);
      setFilteredClients(data);
    } catch (err) {
      setError(err.message);
      console.error('Error cargando clientes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nuevo cliente
  const createClient = useCallback(async (clientData) => {
    setLoading(true);
    setError(null);
    try {
      const newClient = await clientService.createClient(clientData);
      setClients(prev => [...prev, newClient]);
      setFilteredClients(prev => [...prev, newClient]);
      return newClient;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar cliente existente
  const updateClient = useCallback(async (id, clientData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedClient = await clientService.updateClient(id, clientData);
      setClients(prev => prev.map(c => c.id === id ? updatedClient : c));
      setFilteredClients(prev => prev.map(c => c.id === id ? updatedClient : c));
      return updatedClient;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar cliente
  const deleteClient = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await clientService.deleteClient(id);
      setClients(prev => prev.filter(c => c.id !== id));
      setFilteredClients(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar clientes por nombre
  const searchClientsByName = useCallback(async (name) => {
    setLoading(true);
    setError(null);
    try {
      const results = await clientService.searchClientsByName(name);
      setFilteredClients(results);
      return results;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Buscar clientes por teléfono
  const searchClientsByPhone = useCallback(async (phone) => {
    setLoading(true);
    setError(null);
    try {
      const results = await clientService.searchClientsByPhone(phone);
      setFilteredClients(results);
      return results;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Aplicar filtros
  const applyFilters = useCallback(() => {
    let filtered = [...clients];

    if (filters.searchTerm) {
      filtered = filtered.filter(c => 
        c.nombre.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        c.email?.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.phone) {
      filtered = filtered.filter(c => 
        c.telefono.includes(filters.phone)
      );
    }

    setFilteredClients(filtered);
  }, [clients, filters]);

  // Actualizar filtros
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      phone: ''
    });
  }, []);

  // Obtener cliente por ID
  const getClientById = useCallback((id) => {
    return clients.find(c => c.id === id);
  }, [clients]);

  // Cargar clientes al montar el componente
  useEffect(() => {
    loadClients();
  }, [loadClients]);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return {
    clients,
    filteredClients,
    loading,
    error,
    filters,
    loadClients,
    createClient,
    updateClient,
    deleteClient,
    searchClientsByName,
    searchClientsByPhone,
    updateFilters,
    clearFilters,
    getClientById
  };
};
