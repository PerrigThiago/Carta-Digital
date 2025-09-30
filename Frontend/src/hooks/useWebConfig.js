import { useState, useEffect, useCallback } from 'react';
import { webConfigService } from '../services/webConfigService';

export const useWebConfig = () => {
  const [webParams, setWebParams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredParams, setFilteredParams] = useState([]);
  const [filters, setFilters] = useState({
    group: '',
    searchTerm: ''
  });

  // Cargar todos los parámetros web
  const loadWebParams = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await webConfigService.getAllWebParams();
      setWebParams(data);
      setFilteredParams(data);
    } catch (err) {
      setError(err.message);
      console.error('Error cargando parámetros web:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nuevo parámetro web
  const createWebParam = useCallback(async (paramData) => {
    setLoading(true);
    setError(null);
    try {
      const newParam = await webConfigService.createWebParam(paramData);
      setWebParams(prev => [...prev, newParam]);
      setFilteredParams(prev => [...prev, newParam]);
      return newParam;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar parámetro web existente
  const updateWebParam = useCallback(async (id, paramData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedParam = await webConfigService.updateWebParam(id, paramData);
      setWebParams(prev => prev.map(p => p.id === id ? updatedParam : p));
      setFilteredParams(prev => prev.map(p => p.id === id ? updatedParam : p));
      return updatedParam;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar parámetro web
  const deleteWebParam = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await webConfigService.deleteWebParam(id);
      setWebParams(prev => prev.filter(p => p.id !== id));
      setFilteredParams(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Obtener parámetro por clave
  const getParamByKey = useCallback(async (key) => {
    try {
      return await webConfigService.getWebParamByKey(key);
    } catch (err) {
      console.error('Error obteniendo parámetro por clave:', err);
      return null;
    }
  }, []);

  // Obtener parámetros por grupo
  const getParamsByGroup = useCallback(async (group) => {
    try {
      return await webConfigService.getWebParamsByGroup(group);
    } catch (err) {
      console.error('Error obteniendo parámetros por grupo:', err);
      return [];
    }
  }, []);

  // Aplicar filtros
  const applyFilters = useCallback(() => {
    let filtered = [...webParams];

    if (filters.group) {
      filtered = filtered.filter(p => p.grupo === filters.group);
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(p => 
        p.clave.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        p.valor?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        p.descripcion?.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    setFilteredParams(filtered);
  }, [webParams, filters]);

  // Actualizar filtros
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setFilters({
      group: '',
      searchTerm: ''
    });
  }, []);

  // Obtener grupos únicos
  const getUniqueGroups = useCallback(() => {
    return [...new Set(webParams.map(p => p.grupo))];
  }, [webParams]);

  // Obtener valor de parámetro por clave
  const getParamValue = useCallback((key, defaultValue = '') => {
    const param = webParams.find(p => p.clave === key);
    return param ? param.valor : defaultValue;
  }, [webParams]);

  // Cargar parámetros al montar el componente
  useEffect(() => {
    loadWebParams();
  }, [loadWebParams]);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return {
    webParams,
    filteredParams,
    loading,
    error,
    filters,
    loadWebParams,
    createWebParam,
    updateWebParam,
    deleteWebParam,
    getParamByKey,
    getParamsByGroup,
    updateFilters,
    clearFilters,
    getUniqueGroups,
    getParamValue
  };
};
