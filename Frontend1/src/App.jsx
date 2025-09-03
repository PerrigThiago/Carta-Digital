import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useAuthContext } from './context/AuthContext';
import './App.css';

function AppContent() {
  const { isAuthenticated, isLoading, user } = useAuthContext();

  console.log('=== APP CONTENT RENDERIZADO ===');
  console.log('Estado completo:', { isAuthenticated, isLoading, user });

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    console.log('🔄 Mostrando loading...');
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  // Usuario autenticado - mostrar Dashboard
  if (isAuthenticated && user) {
    console.log('✅ USUARIO AUTENTICADO - Mostrando Dashboard');
    console.log('Usuario:', user);
    return <Dashboard />;
  }
  
  // Usuario no autenticado - mostrar Login
  console.log('❌ NO AUTENTICADO - Mostrando Login');
  console.log('isAuthenticated:', isAuthenticated);
  console.log('user:', user);
  return <Login />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="App">
          <AppContent />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
