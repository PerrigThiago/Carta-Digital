// Configuración del entorno
const ENV = process.env.NODE_ENV || 'development';

const config = {
  development: {
    API_BASE_URL: 'http://localhost:8080/api',
    DEBUG: true,
    LOG_LEVEL: 'debug'
  },
  production: {
    API_BASE_URL: 'https://tu-dominio.com/api', // Cambiar por tu dominio real
    DEBUG: false,
    LOG_LEVEL: 'error'
  },
  test: {
    API_BASE_URL: 'http://localhost:8080/api',
    DEBUG: true,
    LOG_LEVEL: 'debug'
  }
};

export const ENVIRONMENT = config[ENV] || config.development;

// Configuración de la base de datos (para referencia)
export const DB_CONFIG = {
  host: 'localhost',
  port: 3306,
  database: 'carta_digital',
  username: 'root',
  password: 'thiago'
};

// Configuración de CORS
export const CORS_CONFIG = {
  allowedOrigins: [
    'http://localhost:3000',
    'http://localhost:5173', // Puerto por defecto de Vite
    'http://127.0.0.1:5173'
  ]
};

// Configuración de autenticación
export const AUTH_CONFIG = {
  tokenKey: 'authToken',
  userKey: 'user',
  tokenExpiry: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
  refreshThreshold: 5 * 60 * 1000 // 5 minutos antes de expirar
};

// Configuración de paginación por defecto
export const DEFAULT_PAGINATION = {
  pageSize: 10,
  maxPageSize: 100,
  defaultSort: 'id',
  defaultOrder: 'desc'
};

// Configuración de archivos
export const FILE_CONFIG = {
  maxFileSize: 5 * 1024 * 1024, // 5MB
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  uploadPath: '/uploads/'
};

// Configuración de notificaciones
export const NOTIFICATION_CONFIG = {
  defaultDuration: 5000, // 5 segundos
  maxNotifications: 5,
  position: 'top-right'
};
