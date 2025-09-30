import { useState, useEffect, useCallback } from 'react';
import { auth } from '../utils/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = auth.getCurrentUser();
      const tokenValid = auth.isTokenValid();
      
      if (currentUser && tokenValid) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Función de login
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    
    try {
      const response = await auth.login(credentials);
      
      if (response && response.user) {
        setUser(response.user);
        setIsAuthenticated(true);
        return response;
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
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

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout
  };
};