// Configuración de la API
export const API_CONFIG = {
  // URL base del backend
  BASE_URL: 'http://localhost:8080/api',
  
  // Endpoints
  ENDPOINTS: {
    // Usuarios
    USERS: '/usuarios',
    LOGIN: '/usuarios/login',
    
    // Productos
    PRODUCTS: '/productos',
    
    // Pedidos
    ORDERS: '/pedidos',
    
    // Carrito
    CARTS: '/carritos',
    CART_PRODUCTS: '/carrito-productos',
    
    // Clientes
    CLIENTS: '/clientes',
    
    // Parámetros web
    WEB_PARAMS: '/parametros-web'
  },
  
  // Headers por defecto
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json'
  },
  
  // Timeout de las peticiones (en ms)
  TIMEOUT: 10000,
  
  // Configuración de reintentos
  RETRY_CONFIG: {
    maxRetries: 3,
    retryDelay: 1000
  }
};

// Estados de los pedidos
export const ORDER_STATUS = {
  PENDING: 'PENDIENTE',
  IN_PROGRESS: 'EN_PROCESO',
  READY: 'LISTO',
  DELIVERED: 'ENTREGADO',
  CANCELLED: 'CANCELADO'
};

// Grupos de productos
export const PRODUCT_GROUPS = {
  FOOD: 'COMIDA',
  DRINKS: 'BEBIDAS',
  DESSERTS: 'POSTRES',
  SIDES: 'ACOMPAÑAMIENTOS'
};

// Configuración de paginación
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100
};
