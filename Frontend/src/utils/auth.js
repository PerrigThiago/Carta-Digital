// Utilidades para manejar la autenticación con el backend Spring Boot

const API_BASE_URL = 'http://localhost:8080/api';

export const auth = {
  // Login del usuario
  login: async (credentials) => {
    try {
      console.log('=== AUTH.LOGIN INICIADO ===');
      console.log('Credenciales recibidas:', credentials);
      
      // Validar formato básico de credenciales
      if (!credentials?.username || !credentials?.password) {
        throw new Error('Nombre de usuario y contraseña son requeridos');
      }

      if (credentials.password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      console.log('Enviando petición de login al backend...');
      console.log('URL:', `${API_BASE_URL}/usuarios/login`);
      console.log('Body:', JSON.stringify({
        usuario: credentials.username,
        contrasenia: credentials.password
      }));

      const response = await fetch(`${API_BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: credentials.username,
          contrasenia: credentials.password
        })
      });

      console.log('Respuesta del backend recibida:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.log('Error 401 del backend - Credenciales incorrectas');
          throw new Error('El nombre de usuario o la contraseña son incorrectos');
        } else if (response.status === 400) {
          const errorData = await response.text();
          console.log('Error 400 del backend:', errorData);
          throw new Error(errorData || 'Datos de entrada inválidos');
        } else {
          throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
        }
      }

      const userData = await response.json();
      console.log('Datos del usuario recibidos del backend:', userData);
      
      // Crear token simulado (en producción usar JWT real del backend)
      const token = 'jwt-token-' + Date.now();
      
      const userObject = {
        id: userData.id,
        username: userData.usuario,
        name: userData.usuario || 'Usuario'
      };

      console.log('Objeto de usuario creado:', userObject);
      
      // Guardar en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userObject));

      const result = {
        success: true,
        token: token,
        user: userObject
      };

      console.log('=== LOGIN EXITOSO ===');
      console.log('Resultado final:', result);
      console.log('Token guardado:', token);
      console.log('Usuario guardado en localStorage:', userObject);
      
      return result;
    } catch (error) {
      console.error('=== ERROR EN AUTH.LOGIN ===');
      console.error('Error completo:', error);
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

    console.log('GET Request:', `${API_BASE_URL}${url}`);

    const response = await fetch(`${API_BASE_URL}${url}`, { 
      ...options, 
      headers,
      method: 'GET'
    });

    console.log('GET Response:', response.status, response.statusText);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
        console.error('GET Error:', errorText);
      } catch (e) {
        console.error('Error leyendo respuesta de error:', e);
      }
      throw new Error(errorMessage);
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

    console.log('POST Request:', `${API_BASE_URL}${url}`, data);

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
      ...options
    });

    console.log('POST Response:', response.status, response.statusText);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
        console.error('POST Error:', errorText);
      } catch (e) {
        console.error('Error leyendo respuesta de error:', e);
      }
      throw new Error(errorMessage);
    }

    // Intentar parsear como JSON, si falla devolver texto
    try {
      const jsonResponse = await response.json();
      console.log('POST Success JSON:', jsonResponse);
      return jsonResponse;
    } catch (e) {
      const textResponse = await response.text();
      console.log('POST Success Text:', textResponse);
      return textResponse;
    }
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

    console.log('PUT Request:', `${API_BASE_URL}${url}`, data);

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
      ...options
    });

    console.log('PUT Response:', response.status, response.statusText);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
        console.error('PUT Error:', errorText);
      } catch (e) {
        console.error('Error leyendo respuesta de error:', e);
      }
      throw new Error(errorMessage);
    }

    // Intentar parsear como JSON, si falla devolver texto
    try {
      const jsonResponse = await response.json();
      console.log('PUT Success JSON:', jsonResponse);
      return jsonResponse;
    } catch (e) {
      const textResponse = await response.text();
      console.log('PUT Success Text:', textResponse);
      return textResponse;
    }
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

    console.log('DELETE Request:', `${API_BASE_URL}${url}`);

    const response = await fetch(`${API_BASE_URL}${url}`, {
      method: 'DELETE',
      headers,
      ...options
    });

    console.log('DELETE Response:', response.status, response.statusText);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorText = await response.text();
        errorMessage = errorText || errorMessage;
        console.error('DELETE Error:', errorText);
      } catch (e) {
        console.error('Error leyendo respuesta de error:', e);
      }
      throw new Error(errorMessage);
    }

    // Intentar parsear como JSON, si falla devolver texto
    try {
      const jsonResponse = await response.json();
      console.log('DELETE Success JSON:', jsonResponse);
      return jsonResponse;
    } catch (e) {
      const textResponse = await response.text();
      console.log('DELETE Success Text:', textResponse);
      return textResponse;
    }
  }
};