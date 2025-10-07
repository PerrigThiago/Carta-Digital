import { useState, useEffect } from 'react';
import { productService } from '../services/productService';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Obtener TODOS los productos (para el dashboard admin)
      const allProducts = await productService.getAllProducts();
      console.log('Productos cargados:', allProducts);
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      
      // Extraer categorías únicas
      const uniqueCategories = [...new Set(allProducts.map(p => p.grupo))].filter(Boolean);
      console.log('Categorías encontradas:', uniqueCategories);
      setCategories(uniqueCategories);
      
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar productos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Crear producto
  const createProduct = async (productData) => {
    try {
      console.log('Creando producto:', productData);
      setLoading(true);
      await productService.createProduct(productData);
      await loadProducts(); // Recargar productos después de crear
      return { success: true };
    } catch (err) {
      console.error('Error al crear producto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar producto
  const updateProduct = async (id, productData) => {
    try {
      console.log('Actualizando producto:', id, productData);
      setLoading(true);
      await productService.updateProduct(id, productData);
      await loadProducts(); // Recargar productos después de actualizar
      return { success: true };
    } catch (err) {
      console.error('Error al actualizar producto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar producto
  const deleteProduct = async (id) => {
    try {
      console.log('Eliminando producto:', id);
      setLoading(true);
      await productService.deleteProduct(id);
      await loadProducts(); // Recargar productos después de eliminar
      return { success: true };
    } catch (err) {
      console.error('Error al eliminar producto:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar categoría
  const deleteCategory = async (category) => {
    try {
      console.log('Eliminando categoría:', category);
      setLoading(true);
      await productService.deleteCategory(category);
      await loadProducts(); // Recargar productos después de eliminar categoría
      return { success: true };
    } catch (err) {
      console.error('Error al eliminar categoría:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar filtros
  const updateFilters = (filters) => {
    console.log('Actualizando filtros:', filters);
    
    let filtered = [...products];
    
    // Filtrar por término de búsqueda
    if (filters.searchTerm) {
      filtered = filtered.filter(p => 
        p.nombre.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }
    
    // Filtrar por grupo/categoría
    if (filters.group) {
      filtered = filtered.filter(p => p.grupo === filters.group);
    }
    
    setFilteredProducts(filtered);
  };

  // Limpiar filtros
  const clearFilters = () => {
    console.log('Limpiando filtros');
    setFilteredProducts(products);
    setSearchTerm('');
  };

  const getUniqueGroups = () => {
    return categories;
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    filteredProducts,
    categories,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    createProduct,
    updateProduct,
    deleteProduct,
    deleteCategory,
    updateFilters,
    clearFilters,
    getUniqueGroups,
    reloadProducts: loadProducts
  };
};