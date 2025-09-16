// Configuración de la API
export const apiConfig = {
  // URL base del backend
  baseURL: 'http://localhost:8080',
  
  // Endpoints
  endpoints: {
    // Usuarios
    users: '/api/usuarios',
    login: '/api/usuarios/login',
    
    // Productos
    products: '/api/productos',
    
    // Pedidos
    orders: '/api/pedidos',
    
    // Carrito
    carts: '/api/carritos',
    cartProducts: '/api/carrito-productos',
    
    // Clientes
    clients: '/api/clientes',
    
    // Parámetros web
    webParams: '/api/parametros-web'
  },
  
  // Headers por defecto
  defaultHeaders: {
    'Content-Type': 'application/json'
  },
  
  // Timeout de las peticiones (en ms)
  timeout: 10000,
  
  // Configuración de reintentos
  retryConfig: {
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
