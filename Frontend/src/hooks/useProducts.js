import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    group: '',
    searchTerm: '',
    availability: 'all'
  });

  // Cargar todos los productos
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Cargando productos...');
      const data = await productService.getAllProducts();
      console.log('Productos cargados:', data);
      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (err) {
      console.error('Error cargando productos:', err);
      setError(err.message || 'Error cargando productos');
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nuevo producto
  const createProduct = useCallback(async (productData) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Creando producto:', productData);
      const newProduct = await productService.createProduct(productData);
      console.log('Producto creado:', newProduct);
      
      // Actualizar la lista local
      setProducts(prev => [...prev, newProduct]);
      setFilteredProducts(prev => [...prev, newProduct]);
      
      return newProduct;
    } catch (err) {
      console.error('Error creando producto:', err);
      setError(err.message || 'Error creando producto');
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
      console.log('Actualizando producto:', id, productData);
      const updatedProduct = await productService.updateProduct(id, productData);
      console.log('Producto actualizado:', updatedProduct);
      
      // Actualizar la lista local
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      setFilteredProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      
      return updatedProduct;
    } catch (err) {
      console.error('Error actualizando producto:', err);
      setError(err.message || 'Error actualizando producto');
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
      console.log('Eliminando producto:', id);
      const result = await productService.deleteProduct(id);
      console.log('Producto eliminado:', result);
      
      // Recargar productos desde el servidor para asegurar consistencia
      await loadProducts();
      
      return result;
    } catch (err) {
      console.error('Error eliminando producto:', err);
      setError(err.message || 'Error eliminando producto');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadProducts]);

  // Eliminar categoría y todos sus productos
  const deleteCategory = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Eliminando categoría:', category);
      const result = await productService.deleteCategory(category);
      console.log('Categoría eliminada:', result);
      
      // Recargar productos desde el servidor para asegurar consistencia
      await loadProducts();
      
      return result;
    } catch (err) {
      console.error('Error eliminando categoría:', err);
      setError(err.message || 'Error eliminando categoría');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [loadProducts]);

  // Aplicar filtros
  const applyFilters = useCallback(() => {
    let filtered = [...products];

    if (filters.group) {
      filtered = filtered.filter(p => p.grupo === filters.group);
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
      searchTerm: '',
      availability: 'all'
    });
  }, []);

  // Obtener grupos únicos
  const getUniqueGroups = useCallback(() => {
    const groups = [...new Set(products.map(p => p.grupo).filter(Boolean))];
    console.log('Grupos únicos:', groups);
    return groups;
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
    deleteCategory,
    updateFilters,
    clearFilters,
    getUniqueGroups
  };
};