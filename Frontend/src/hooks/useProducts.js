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
      
      // Obtener productos disponibles
      const availableProducts = await productService.getAvailableProducts();
      setProducts(availableProducts);
      setFilteredProducts(availableProducts);
      
      // Extraer categorías únicas
      const uniqueCategories = [...new Set(availableProducts.map(p => p.grupo))];
      setCategories(uniqueCategories);
      
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar productos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Funciones mock para compatibilidad con Menu.jsx
  const createProduct = async (productData) => {
    console.log('createProduct called:', productData);
    return { success: true };
  };

  const updateProduct = async (id, productData) => {
    console.log('updateProduct called:', id, productData);
    return { success: true };
  };

  const deleteProduct = async (id) => {
    console.log('deleteProduct called:', id);
    return { success: true };
  };

  const deleteCategory = async (category) => {
    console.log('deleteCategory called:', category);
    return { success: true };
  };

  const updateFilters = (filters) => {
    console.log('updateFilters called:', filters);
  };

  const clearFilters = () => {
    console.log('clearFilters called');
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