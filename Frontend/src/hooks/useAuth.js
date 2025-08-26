import { useState, useEffect, useCallback } from 'react';
import { auth } from '../utils/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar estado de autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const currentUser = auth.getCurrentUser();
        const tokenValid = auth.isTokenValid();
        
        if (currentUser && tokenValid) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          // Token inválido, limpiar estado
          auth.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error);
        auth.logout();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Función de login
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const response = await auth.login(credentials);
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Función de logout
  const logout = useCallback(() => {
    auth.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // Función para actualizar datos del usuario
  const updateUser = useCallback((userData) => {
    setUser(prev => ({ ...prev, ...userData }));
    // También actualizar en localStorage
    localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
  }, [user]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser
  };
};
