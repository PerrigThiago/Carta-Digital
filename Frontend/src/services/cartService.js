import { apiConfig } from '../config/apiConfig';

const API_BASE_URL = apiConfig.baseURL;

export const cartService = {
  // Crear carrito
  async createCart(clientId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/carritos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clienteId })
      });
      
      if (!response.ok) {
        throw new Error('Error al crear carrito');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en createCart:', error);
      throw error;
    }
  },

  // Obtener carrito por ID
  async getCart(cartId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/carritos/${cartId}`);
      if (!response.ok) {
        throw new Error('Error al obtener carrito');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getCart:', error);
      throw error;
    }
  },

  // Obtener items del carrito
  async getCartItems(cartId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/carritos/${cartId}/items`);
      if (!response.ok) {
        throw new Error('Error al obtener items del carrito');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getCartItems:', error);
      throw error;
    }
  },

  // Agregar producto al carrito
  async addItemToCart(cartId, productId, quantity) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/carritos/${cartId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productoId, cantidad: quantity })
      });
      
      if (!response.ok) {
        throw new Error('Error al agregar producto al carrito');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en addItemToCart:', error);
      throw error;
    }
  },

  // Actualizar cantidad de item
  async updateItemQuantity(cartId, productId, quantity) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/carritos/${cartId}/items/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cantidad: quantity })
      });
      
      if (!response.ok) {
        throw new Error('Error al actualizar cantidad');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en updateItemQuantity:', error);
      throw error;
    }
  },

  // Eliminar item del carrito
  async removeItemFromCart(cartId, productId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/carritos/${cartId}/items/${productId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Error al eliminar item del carrito');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en removeItemFromCart:', error);
      throw error;
    }
  },

  // Vaciar carrito
  async clearCart(cartId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/carritos/${cartId}/vaciar`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Error al vaciar carrito');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en clearCart:', error);
      throw error;
    }
  },

  // Obtener total del carrito
  async getCartTotal(cartId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/carritos/${cartId}/total`);
      if (!response.ok) {
        throw new Error('Error al obtener total del carrito');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en getCartTotal:', error);
      throw error;
    }
  },

  // Confirmar carrito (crear pedido)
  async confirmCart(cartId) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/carritos/${cartId}/confirmar`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Error al confirmar carrito');
      }
      return await response.json();
    } catch (error) {
      console.error('Error en confirmCart:', error);
      throw error;
    }
  }
};