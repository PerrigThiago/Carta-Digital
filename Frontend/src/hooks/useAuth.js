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
        
        console.log('Verificando autenticación:', { currentUser, tokenValid });
        
        if (currentUser && tokenValid) {
          console.log('Usuario autenticado encontrado:', currentUser);
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          console.log('No hay usuario autenticado, limpiando estado');
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
    console.log('=== INICIO LOGIN ===');
    console.log('Credenciales recibidas:', credentials);
    
    setIsLoading(true);
    
    try {
      console.log('Llamando a auth.login...');
      const response = await auth.login(credentials);
      console.log('Respuesta de auth.login:', response);
      
      if (response && response.user) {
        console.log('Usuario recibido:', response.user);
        
        // Actualizar el estado de forma síncrona
        setUser(response.user);
        setIsAuthenticated(true);
        
        console.log('Estado actualizado - Usuario:', response.user, 'Autenticado:', true);
        
        // Esperar un tick para asegurar que el estado se propague
        await new Promise(resolve => setTimeout(resolve, 10));
        
        console.log('Estado después del timeout:', { user, isAuthenticated });
      } else {
        console.error('Respuesta inválida de auth.login:', response);
        throw new Error('Respuesta inválida del servidor');
      }
      
      return response;
    } catch (error) {
      console.error('Error en login:', error);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
      console.log('Estado final después del login:', { user, isAuthenticated, isLoading: false });
    }
  }, []);

  // Función de logout
  const logout = useCallback(() => {
    console.log('Ejecutando logout...');
    auth.logout();
    setUser(null);
    setIsAuthenticated(false);
    console.log('Estado actualizado después del logout:', { user: null, isAuthenticated: false });
  }, []);

  // Función para actualizar datos del usuario
  const updateUser = useCallback((userData) => {
    setUser(prev => ({ ...prev, ...userData }));
    localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
  }, [user]);

  // Log del estado actual para debugging
  useEffect(() => {
    console.log('=== ESTADO DE AUTENTICACIÓN ACTUALIZADO ===');
    console.log('Usuario:', user);
    console.log('Autenticado:', isAuthenticated);
    console.log('Cargando:', isLoading);
  }, [user, isAuthenticated, isLoading]);

  // Efecto para sincronizar el estado con localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('=== SINCRONIZANDO ESTADO CON LOCALSTORAGE ===');
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('authToken', 'jwt-token-' + Date.now());
    }
  }, [isAuthenticated, user]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser
  };
};
