import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    group: '',
    subGroup: '',
    searchTerm: '',
    availability: 'all'
  });

  // Cargar todos los productos
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (err) {
      setError(err.message);
      console.error('Error cargando productos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nuevo producto
  const createProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await productService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      setFilteredProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Actualizar producto
  const updateProduct = useCallback(async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProduct = await productService.updateProduct(id, productData);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      setFilteredProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Eliminar producto
  const deleteProduct = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      setFilteredProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Aplicar filtros
  const applyFilters = useCallback(() => {
    let filtered = [...products];

    if (filters.group) {
      filtered = filtered.filter(p => p.grupo === filters.group);
    }

    if (filters.subGroup) {
      filtered = filtered.filter(p => p.subGrupo === filters.subGroup);
    }

    if (filters.searchTerm) {
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        p.descripcion?.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    if (filters.availability !== 'all') {
      const available = filters.availability === 'available';
      filtered = filtered.filter(p => p.disponibilidad === available);
    }

    setFilteredProducts(filtered);
  }, [products, filters]);

  // Actualizar filtros
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setFilters({
      group: '',
      subGroup: '',
      searchTerm: '',
      availability: 'all'
    });
  }, []);

  // Obtener grupos únicos
  const getUniqueGroups = useCallback(() => {
    return [...new Set(products.map(p => p.grupo))];
  }, [products]);

  // Obtener subgrupos únicos
  const getUniqueSubGroups = useCallback(() => {
    return [...new Set(products.map(p => p.subGrupo).filter(Boolean))];
  }, [products]);

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return {
    products,
    filteredProducts,
    loading,
    error,
    filters,
    loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    updateFilters,
    clearFilters,
    getUniqueGroups,
    getUniqueSubGroups
  };
};
