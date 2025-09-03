import { apiClient } from '../utils/auth';

export const cartService = {
  // Obtener carrito del usuario
  getUserCart: async () => {
    try {
      const carts = await apiClient.get('/carritos');
      // Por ahora retornamos el primer carrito, en producción debería filtrar por usuario
      return carts.length > 0 ? carts[0] : null;
    } catch (error) {
      console.error('Error obteniendo carrito:', error);
      throw error;
    }
  },

  // Crear nuevo carrito
  createCart: async (cartData) => {
    try {
      return await apiClient.post('/carritos', cartData);
    } catch (error) {
      console.error('Error creando carrito:', error);
      throw error;
    }
  },

  // Agregar producto al carrito
  addProductToCart: async (cartId, productId, quantity = 1) => {
    try {
      const cartProductData = {
        carrito: { id: cartId },
        producto: { id: productId },
        cantidad: quantity
      };
      return await apiClient.post('/carrito-productos', cartProductData);
    } catch (error) {
      console.error('Error agregando producto al carrito:', error);
      throw error;
    }
  },

  // Actualizar cantidad de producto en el carrito
  updateCartProductQuantity: async (cartProductId, quantity) => {
    try {
      return await apiClient.put(`/carrito-productos/${cartProductId}`, { cantidad: quantity });
    } catch (error) {
      console.error('Error actualizando cantidad:', error);
      throw error;
    }
  },

  // Eliminar producto del carrito
  removeProductFromCart: async (cartProductId) => {
    try {
      return await apiClient.delete(`/carrito-productos/${cartProductId}`);
    } catch (error) {
      console.error('Error eliminando producto del carrito:', error);
      throw error;
    }
  },

  // Limpiar carrito
  clearCart: async (cartId) => {
    try {
      const cart = await this.getUserCart();
      if (cart && cart.carritoProductos) {
        for (const cartProduct of cart.carritoProductos) {
          await this.removeProductFromCart(cartProduct.id);
        }
      }
      return true;
    } catch (error) {
      console.error('Error limpiando carrito:', error);
      throw error;
    }
  },

  // Obtener total del carrito
  getCartTotal: async () => {
    try {
      const cart = await this.getUserCart();
      if (!cart || !cart.carritoProductos) return 0;
      
      return cart.carritoProductos.reduce((total, cartProduct) => {
        return total + (cartProduct.producto.precio * cartProduct.cantidad);
      }, 0);
    } catch (error) {
      console.error('Error calculando total del carrito:', error);
      return 0;
    }
  }
};
