// Configuración para diferentes entornos
const config = {
  development: {
    API_BASE_URL: 'http://localhost:8080/api',
    DEBUG: true,
    TIMEOUT: 10000, // 10 segundos
  },
  production: {
    API_BASE_URL: 'https://tu-dominio.com/api', // Cambia esto por tu URL de producción
    DEBUG: false,
    TIMEOUT: 15000, // 15 segundos
  },
  test: {
    API_BASE_URL: 'http://localhost:8080/api',
    DEBUG: true,
    TIMEOUT: 5000,
  }
};

// Determinar el entorno actual
const environment = process.env.NODE_ENV || 'development';

// Exportar la configuración del entorno actual
export const currentConfig = config[environment];

// Configuración específica para CORS (si es necesaria)
export const corsConfig = {
  credentials: 'include', // Para cookies de sesión
  mode: 'cors',
};

// Configuración para manejo de errores
export const errorConfig = {
  maxRetries: 3,
  retryDelay: 1000, // 1 segundo
  showUserFriendlyErrors: true,
};

// URLs específicas de endpoints
export const endpoints = {
  products: '/products',
  orders: '/orders',
  categories: '/categories',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
  },
  users: '/users',
};

export default currentConfig;
