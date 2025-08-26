import { currentConfig, corsConfig, errorConfig, endpoints } from '../config/config';

// Función para hacer peticiones HTTP con timeout y reintentos
const makeRequest = async (endpoint, options = {}) => {
  let lastError;
  
  for (let attempt = 1; attempt <= errorConfig.maxRetries; attempt++) {
    try {
      // Crear un controlador de aborto para timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), currentConfig.TIMEOUT);

      const response = await fetch(`${currentConfig.API_BASE_URL}${endpoint}`, {
        ...corsConfig,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        signal: controller.signal,
        ...options,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      
      // Si es el último intento, no reintentar
      if (attempt === errorConfig.maxRetries) {
        break;
      }
      
      // Si es un error de timeout o red, reintentar
      if (error.name === 'AbortError' || error.name === 'TypeError') {
        console.warn(`Intento ${attempt} falló, reintentando en ${errorConfig.retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, errorConfig.retryDelay));
        continue;
      }
      
      // Si es un error HTTP, no reintentar
      break;
    }
  }
  
  throw lastError;
};

// Funciones para productos/menú
export const productAPI = {
  // Obtener todos los productos
  getAllProducts: () => makeRequest(endpoints.products),
  
  // Obtener producto por ID
  getProductById: (id) => makeRequest(`${endpoints.products}/${id}`),
  
  // Obtener productos por categoría
  getProductsByCategory: (category) => makeRequest(`${endpoints.products}/category/${category}`),
  
  // Crear nuevo producto (para administradores)
  createProduct: (productData) => makeRequest(endpoints.products, {
    method: 'POST',
    body: JSON.stringify(productData),
  }),
  
  // Actualizar producto
  updateProduct: (id, productData) => makeRequest(`${endpoints.products}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  }),
  
  // Eliminar producto
  deleteProduct: (id) => makeRequest(`${endpoints.products}/${id}`, {
    method: 'DELETE',
  }),
};

// Funciones para pedidos
export const orderAPI = {
  // Crear nuevo pedido
  createOrder: (orderData) => makeRequest(endpoints.orders, {
    method: 'POST',
    body: JSON.stringify(orderData),
  }),
  
  // Obtener pedidos del usuario
  getUserOrders: (userId) => makeRequest(`${endpoints.orders}/user/${userId}`),
  
  // Obtener pedido por ID
  getOrderById: (id) => makeRequest(`${endpoints.orders}/${id}`),
  
  // Actualizar estado del pedido
  updateOrderStatus: (id, status) => makeRequest(`${endpoints.orders}/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  }),
};

// Funciones para categorías
export const categoryAPI = {
  // Obtener todas las categorías
  getAllCategories: () => makeRequest(endpoints.categories),
  
  // Obtener productos de una categoría
  getCategoryProducts: (categoryId) => makeRequest(`${endpoints.categories}/${categoryId}/products`),
};

// Funciones para usuarios
export const userAPI = {
  // Login de usuario
  login: (credentials) => makeRequest(endpoints.auth.login, {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  // Registro de usuario
  register: (userData) => makeRequest(endpoints.auth.register, {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  // Obtener perfil del usuario
  getUserProfile: (token) => makeRequest(`${endpoints.users}/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  }),
};

// Función para manejar errores de red
export const handleApiError = (error) => {
  if (currentConfig.DEBUG) {
    console.error('Error detallado:', error);
  }
  
  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return 'Error de conexión. Verifica que tu backend esté ejecutándose.';
  }
  
  if (error.name === 'AbortError') {
    return 'La petición tardó demasiado. Intenta nuevamente.';
  }
  
  if (error.message.includes('401')) {
    return 'No autorizado. Inicia sesión nuevamente.';
  }
  
  if (error.message.includes('403')) {
    return 'Acceso denegado. No tienes permisos para esta acción.';
  }
  
  if (error.message.includes('404')) {
    return 'Recurso no encontrado.';
  }
  
  if (error.message.includes('500')) {
    return 'Error del servidor. Intenta más tarde.';
  }
  
  if (error.message.includes('503')) {
    return 'Servicio no disponible. Intenta más tarde.';
  }
  
  return 'Ocurrió un error inesperado.';
};

export default {
  productAPI,
  orderAPI,
  categoryAPI,
  userAPI,
  handleApiError,
};
