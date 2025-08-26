// Utilidades para manejar la autenticación

// Simular almacenamiento de token (en producción usar localStorage o cookies seguras)
let authToken = null;

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

      // Simular respuesta exitosa (acepta cualquier email válido y contraseña de 6+ caracteres)
      const mockResponse = {
        success: true,
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: 1,
          email: credentials.email,
          name: 'Usuario Demo'
        }
      };

      // Guardar token
      authToken = mockResponse.token;

      // Guardar en localStorage (en producción)
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(mockResponse.user));

      return mockResponse;
    } catch (error) {
      throw new Error(error?.message || 'Error en la autenticación');
    }
  },

  // Logout del usuario
  logout: () => {
    authToken = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return authToken !== null || localStorage.getItem('authToken') !== null;
  },

  // Obtener token actual
  getToken: () => {
    return authToken || localStorage.getItem('authToken');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Verificar si el token es válido (en producción verificar con el backend)
  isTokenValid: () => {
    const token = auth.getToken();
    if (!token) return false;

    // Aquí podrías verificar la expiración del token
    // Por ahora solo verificamos que exista
    return true;
  }
};

// Interceptor para agregar token a las peticiones (opcional)
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

    return fetch(url, { ...options, headers });
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

    return fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      ...options
    });
  }
};
