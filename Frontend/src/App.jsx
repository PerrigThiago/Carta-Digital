import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CartaDigital from './pages/CartaDigital';
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

  return (
    <Routes>
      {/* Ruta principal - Carta Digital */}
      <Route path="/" element={<CartaDigital />} />
      
      {/* Ruta alternativa para la carta digital */}
      <Route path="/carta" element={<CartaDigital />} />
      
      {/* Ruta de login */}
      <Route path="/login" element={<Login />} />
      
      {/* Rutas protegidas para el admin */}
      <Route path="/admin/*" element={
        isAuthenticated && user ? <Dashboard /> : <Login />
      } />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <AppContent />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
