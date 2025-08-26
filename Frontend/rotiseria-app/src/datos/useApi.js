import { useState, useCallback } from 'react';

// Hook personalizado para manejar estados de API
export const useApi = (initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para ejecutar peticiones de API
  const execute = useCallback(async (apiCall, ...args) => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await apiCall(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para limpiar el estado
  const reset = useCallback(() => {
    setData(initialData);
    setLoading(false);
    setError(null);
  }, [initialData]);

  // Función para actualizar datos manualmente
  const updateData = useCallback((newData) => {
    setData(newData);
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    reset,
    updateData,
  };
};

// Hook específico para productos
export const useProducts = () => {
  const { data: products, loading, error, execute, reset, updateData } = useApi([]);

  const fetchProducts = useCallback(async () => {
    const { productAPI } = await import('./api');
    return execute(productAPI.getAllProducts);
  }, [execute]);

  const fetchProductsByCategory = useCallback(async (category) => {
    const { productAPI } = await import('./api');
    return execute(productAPI.getProductsByCategory, category);
  }, [execute]);

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductsByCategory,
    reset,
    updateData,
  };
};

// Hook específico para pedidos
export const useOrders = () => {
  const { data: orders, loading, error, execute, reset, updateData } = useApi([]);

  const createOrder = useCallback(async (orderData) => {
    const { orderAPI } = await import('./api');
    return execute(orderAPI.createOrder, orderData);
  }, [execute]);

  const fetchUserOrders = useCallback(async (userId) => {
    const { orderAPI } = await import('./api');
    return execute(orderAPI.getUserOrders, userId);
  }, [execute]);

  return {
    orders,
    loading,
    error,
    createOrder,
    fetchUserOrders,
    reset,
    updateData,
  };
};

// Hook específico para categorías
export const useCategories = () => {
  const { data: categories, loading, error, execute, reset, updateData } = useApi([]);

  const fetchCategories = useCallback(async () => {
    const { categoryAPI } = await import('./api');
    return execute(categoryAPI.getAllCategories);
  }, [execute]);

  return {
    categories,
    loading,
    error,
    fetchCategories,
    reset,
    updateData,
  };
};
