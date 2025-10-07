import { apiConfig } from '../config/apiConfig';

const API_BASE_URL = apiConfig.baseURL;

export const productService = {
  // Obtener todos los productos
  async getAllProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/productos`);
      if (!response.ok) {
        throw new Error('Error al obtener productos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getAllProducts:', error);
      throw error;
    }
  },

  // Obtener productos disponibles (para la carta pública)
  async getAvailableProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/productos/disponibles`);
      if (!response.ok) {
        throw new Error('Error al obtener productos disponibles');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getAvailableProducts:', error);
      throw error;
    }
  },

  // Obtener productos por grupo/categoría
  async getProductsByGroup(group) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/productos/grupo/${encodeURIComponent(group)}`);
      if (!response.ok) {
        throw new Error('Error al obtener productos por grupo');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getProductsByGroup:', error);
      throw error;
    }
  },

  // Buscar productos por nombre
  async searchProducts(searchTerm) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/productos/buscar?nombre=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Error al buscar productos');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en searchProducts:', error);
      throw error;
    }
  },

  // Obtener producto por ID
  async getProductById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/productos/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener producto');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getProductById:', error);
      throw error;
    }
  },

  // Obtener estadísticas de productos
  async getProductStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/productos/estadisticas`);
      if (!response.ok) {
        throw new Error('Error al obtener estadísticas');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getProductStats:', error);
      throw error;
    }
  },

  // Crear producto
  async createProduct(productData) {
    try {
      console.log('Creando producto:', productData);
      const response = await fetch(`${API_BASE_URL}/api/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al crear producto');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en createProduct:', error);
      throw error;
    }
  },

  // Actualizar producto
  async updateProduct(id, productData) {
    try {
      console.log('Actualizando producto:', id, productData);
      const response = await fetch(`${API_BASE_URL}/api/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al actualizar producto');
      }
      
      // Intentar parsear como JSON, si falla devolver texto
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text();
      }
    } catch (error) {
      console.error('Error en updateProduct:', error);
      throw error;
    }
  },

  // Eliminar producto
  async deleteProduct(id) {
    try {
      console.log('Eliminando producto:', id);
      const response = await fetch(`${API_BASE_URL}/api/productos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al eliminar producto');
      }
      
      return { success: true, message: 'Producto eliminado correctamente' };
    } catch (error) {
      console.error('Error en deleteProduct:', error);
      throw error;
    }
  },

  // Eliminar categoría completa
  async deleteCategory(categoryName) {
    try {
      console.log('Eliminando categoría:', categoryName);
      const response = await fetch(`${API_BASE_URL}/api/productos/categoria/${encodeURIComponent(categoryName)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al eliminar categoría');
      }
      
      return { success: true, message: 'Categoría eliminada correctamente' };
    } catch (error) {
      console.error('Error en deleteCategory:', error);
      throw error;
    }
  }
};