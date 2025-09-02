// Utilidades para manejar la autenticación con el backend Spring Boot

const API_BASE_URL = 'http://localhost:8080/api';

export const auth = {
  // Login del usuario
  login: async (credentials) => {
    try {
      // Validar formato básico de credenciales
      if (!credentials?.email || !credentials?.password) {
        throw new Error('Email y contraseña son requeridos');
      }

      if (credentials.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // Convertir email a nombre de usuario para el backend
      const username = credentials.email.split('@')[0]; // Usar parte local del email como username

      const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: username,
          contrasenia: credentials.password
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Credenciales inválidas');
        }
        throw new Error('Error en el servidor');
      }

      const userData = await response.json();
      
      // Crear token simulado (en producción usar JWT real del backend)
      const token = 'jwt-token-' + Date.now();
      
      // Guardar en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify({
        id: userData.id,
        email: credentials.email,
        name: userData.usuario || 'Usuario',
        username: userData.usuario
      }));

      return {
        success: true,
        token: token,
        user: {
          id: userData.id,
          email: credentials.email,
          name: userData.usuario || 'Usuario',
          username: userData.usuario
        }
      };
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error(error?.message || 'Error en la autenticación');
    }
  },

  // Logout del usuario
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return localStorage.getItem('authToken') !== null;
  },

  // Obtener token actual
  getToken: () => {
    return localStorage.getItem('authToken');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Verificar si el token es válido
  isTokenValid: () => {
    const token = auth.getToken();
    return token !== null;
  }
};

// Cliente API para hacer peticiones al backend
export const apiClient = {
  get: async (url, options = {}) => {
    const token = auth.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, { 
      ...options, 
      headers,
      method: 'GET'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  post: async (url, data, options = {}) => {
    const token = auth.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  put: async (url, data, options = {}) => {
    const token = auth.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  },

  delete: async (url, options = {}) => {
    const token = auth.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers,
      ...options
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
};
