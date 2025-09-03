import { useState, useEffect, useCallback } from 'react';
import { orderService } from '../services/orderService';

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    clientId: '',
    searchTerm: '',
    dateFrom: '',
    dateTo: ''
  });

  // Cargar todos los pedidos
  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderService.getAllOrders();
      setOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      setError(err.message);
      console.error('Error cargando pedidos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nuevo pedido
  const createOrder = useCallback(async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const newOrder = await orderService.createOrder(orderData);
      setOrders(prev => [...prev, newOrder]);
      setFilteredOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar estado del pedido
  const updateOrderStatus = useCallback(async (id, status) => {
    setLoading(true);
    setError(null);
    try {
      const updatedOrder = await orderService.updateOrderStatus(id, status);
      setOrders(prev => prev.map(o => o.id === id ? updatedOrder : o));
      setFilteredOrders(prev => prev.map(o => o.id === id ? updatedOrder : o));
      return updatedOrder;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar pedido
  const deleteOrder = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await orderService.deleteOrder(id);
      setOrders(prev => prev.filter(o => o.id !== id));
      setFilteredOrders(prev => prev.filter(o => o.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Aplicar filtros
  const applyFilters = useCallback(() => {
    let filtered = [...orders];

    if (filters.status) {
      filtered = filtered.filter(o => o.estado === filters.status);
    }

    if (filters.clientId) {
      filtered = filtered.filter(o => o.cliente?.id === filters.clientId);
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(o => 
        o.cliente?.nombre?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        o.id.toString().includes(filters.searchTerm)
      );
    }

    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter(o => new Date(o.fechaCreacion) >= fromDate);
    }

    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      filtered = filtered.filter(o => new Date(o.fechaCreacion) <= toDate);
    }

    setFilteredOrders(filtered);
  }, [orders, filters]);

  // Actualizar filtros
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setFilters({
      status: '',
      clientId: '',
      searchTerm: '',
      dateFrom: '',
      dateTo: ''
    });
  }, []);

  // Obtener pedidos por estado
  const getOrdersByStatus = useCallback((status) => {
    return orders.filter(o => o.estado === status);
  }, [orders]);

  // Obtener estadísticas de pedidos
  const getOrderStats = useCallback(() => {
    const total = orders.length;
    const pending = orders.filter(o => o.estado === 'PENDIENTE').length;
    const inProgress = orders.filter(o => o.estado === 'EN_PROCESO').length;
    const ready = orders.filter(o => o.estado === 'LISTO').length;
    const delivered = orders.filter(o => o.estado === 'ENTREGADO').length;
    const cancelled = orders.filter(o => o.estado === 'CANCELADO').length;

    return {
      total,
      pending,
      inProgress,
      ready,
      delivered,
      cancelled
    };
  }, [orders]);

  // Cargar pedidos al montar el componente
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return {
    orders,
    filteredOrders,
    loading,
    error,
    filters,
    loadOrders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    updateFilters,
    clearFilters,
    getOrdersByStatus,
    getOrderStats
  };
};
