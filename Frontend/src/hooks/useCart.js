import { useState, useEffect, useCallback } from 'react';
import { cartService } from '../services/cartService';

export const useCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Cargar carrito del usuario
  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const cartData = await cartService.getUserCart();
      setCart(cartData);
      setCartItems(cartData?.carritoProductos || []);
      setTotal(cartData?.carritoProductos?.reduce((sum, item) => 
        sum + (item.producto.precio * item.cantidad), 0) || 0);
    } catch (err) {
      setError(err.message);
      console.error('Error cargando carrito:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear nuevo carrito
  const createCart = useCallback(async (cartData) => {
    setLoading(true);
    setError(null);
    try {
      const newCart = await cartService.createCart(cartData);
      setCart(newCart);
      setCartItems(newCart?.carritoProductos || []);
      return newCart;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Agregar producto al carrito
  const addToCart = useCallback(async (productId, quantity = 1) => {
    if (!cart) {
      // Si no hay carrito, crear uno nuevo
      const newCart = await createCart({
        fechaCreacion: new Date().toISOString(),
        estado: 'ACTIVO'
      });
      setCart(newCart);
    }

    setLoading(true);
    setError(null);
    try {
      const cartProduct = await cartService.addProductToCart(cart.id, productId, quantity);
      setCartItems(prev => [...prev, cartProduct]);
      setTotal(prev => prev + (cartProduct.producto.precio * quantity));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [cart, createCart]);

  // Actualizar cantidad de producto
  const updateQuantity = useCallback(async (cartProductId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(cartProductId);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await cartService.updateCartProductQuantity(cartProductId, newQuantity);
      
      setCartItems(prev => prev.map(item => {
        if (item.id === cartProductId) {
          const oldQuantity = item.cantidad;
          const price = item.producto.precio;
          setTotal(prevTotal => prevTotal - (oldQuantity * price) + (newQuantity * price));
          return { ...item, cantidad: newQuantity };
        }
        return item;
      }));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Remover producto del carrito
  const removeFromCart = useCallback(async (cartProductId) => {
    setLoading(true);
    setError(null);
    try {
      await cartService.removeProductFromCart(cartProductId);
      
      setCartItems(prev => {
        const itemToRemove = prev.find(item => item.id === cartProductId);
        if (itemToRemove) {
          setTotal(prevTotal => prevTotal - (itemToRemove.producto.precio * itemToRemove.cantidad));
        }
        return prev.filter(item => item.id !== cartProductId);
      });
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Limpiar carrito
  const clearCart = useCallback(async () => {
    if (!cart) return;
    
    setLoading(true);
    setError(null);
    try {
      await cartService.clearCart(cart.id);
      setCartItems([]);
      setTotal(0);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [cart]);

  // Obtener cantidad de un producto en el carrito
  const getProductQuantity = useCallback((productId) => {
    const cartItem = cartItems.find(item => item.producto.id === productId);
    return cartItem ? cartItem.cantidad : 0;
  }, [cartItems]);

  // Verificar si un producto está en el carrito
  const isProductInCart = useCallback((productId) => {
    return cartItems.some(item => item.producto.id === productId);
  }, [cartItems]);

  // Cargar carrito al montar el componente
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return {
    cart,
    cartItems,
    total,
    loading,
    error,
    loadCart,
    createCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getProductQuantity,
    isProductInCart
  };
};
