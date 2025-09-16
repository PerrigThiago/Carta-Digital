import { useState, useEffect } from 'react';
import { historialRankingService } from '../services/historialRankingService';

export const useHistorialRanking = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);
  const [rankingProductos, setRankingProductos] = useState([]);
  const [historialPedidos, setHistorialPedidos] = useState([]);
  const [filtros, setFiltros] = useState({
    estado: '',
    fecha: ''
  });

  // Cargar datos iniciales
  const cargarDatos = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [estadisticasData, rankingData, historialData] = await Promise.all([
        historialRankingService.obtenerEstadisticas(),
        historialRankingService.obtenerRankingProductos(),
        historialRankingService.obtenerHistorialReciente(20)
      ]);

      setEstadisticas(estadisticasData);
      setRankingProductos(rankingData);
      setHistorialPedidos(historialData);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar datos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar pedidos por estado
  const filtrarPorEstado = async (estado) => {
    if (!estado) {
      cargarDatos();
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const pedidos = await historialRankingService.obtenerPedidosPorEstado(estado);
      setHistorialPedidos(pedidos);
      setFiltros(prev => ({ ...prev, estado }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar pedidos por fecha
  const filtrarPorFecha = async (fecha) => {
    if (!fecha) {
      cargarDatos();
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const pedidos = await historialRankingService.obtenerPedidosPorFecha(fecha);
      setHistorialPedidos(pedidos);
      setFiltros(prev => ({ ...prev, fecha }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    setFiltros({ estado: '', fecha: '' });
    cargarDatos();
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    cargarDatos();
  }, []);

  return {
    loading,
    error,
    estadisticas,
    rankingProductos,
    historialPedidos,
    filtros,
    cargarDatos,
    filtrarPorEstado,
    filtrarPorFecha,
    limpiarFiltros
  };
};
