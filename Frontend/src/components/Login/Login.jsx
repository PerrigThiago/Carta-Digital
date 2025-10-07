import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuthContext();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Efecto para detectar cuando el usuario se autentica y redirigir
  useEffect(() => {
    if (isAuthenticated && user) {
      console.log('=== REDIRECCIÓN AUTOMÁTICA DESDE LOGIN ===');
      console.log('Usuario autenticado detectado:', user);
      console.log('Redirigiendo al dashboard...');
      
      // Navegar al dashboard sin recargar la página
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Limpiar error general cuando el usuario modifique cualquier campo
    if (errors.general) {
      setErrors(prev => ({
        ...prev,
        general: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validar nombre de usuario
    if (!formData.username || formData.username.trim() === '') {
      newErrors.username = 'El nombre de usuario es requerido';
    } else if (formData.username.trim().length < 3) {
      newErrors.username = 'El nombre de usuario debe tener al menos 3 caracteres';
    }
    
    // Validar contraseña
    if (!formData.password || formData.password === '') {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Formulario enviado con datos:', formData);
    
    if (!validateForm()) {
      console.log('Validación del formulario falló');
      return;
    }
    
    setIsLoading(true);
    console.log('Iniciando proceso de login...');
    
    try {
      // Usar el hook de autenticación
      const result = await login(formData);
      console.log('Login exitoso, resultado:', result);
      
      // El hook maneja el estado, solo mostrar mensaje de éxito
      console.log('Login exitoso!');
      
    } catch (error) {
      console.error('Error en login:', error);
      
      // Mostrar mensaje de error más amigable
      let errorMessage = 'Error en el login. Inténtalo de nuevo.';
      
      if (error?.message) {
        if (error.message.includes('incorrectos')) {
          errorMessage = 'El nombre de usuario o la contraseña son incorrectos. Verifica tus datos.';
        } else if (error.message.includes('requeridos')) {
          errorMessage = 'Por favor, completa todos los campos requeridos.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Bienvenido</h1>
          <p>Inicia sesión en tu cuenta</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {errors.general && (
            <div className="error-message general-error">
              {errors.general}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Ingresa tu nombre de usuario"
              className={errors.username ? 'error' : ''}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="form-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Recordarme
            </label>
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            Ingresa tu nombre de usuario y contraseña
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
