import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme debe ser usado dentro de un ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Obtener tema del localStorage o usar 'claro' por defecto
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'claro';
  });

  const [isDark, setIsDark] = useState(false);

  // Función para cambiar el tema
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Función para aplicar el tema actual
  const applyTheme = (currentTheme) => {
    const root = document.documentElement;
    
    if (currentTheme === 'auto') {
      // Detectar preferencia del sistema
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
      
      if (prefersDark) {
        root.classList.add('dark-theme');
        root.classList.remove('light-theme');
      } else {
        root.classList.add('light-theme');
        root.classList.remove('dark-theme');
      }
    } else if (currentTheme === 'oscuro') {
      setIsDark(true);
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      setIsDark(false);
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
  };

  // Efecto para aplicar el tema cuando cambie
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Efecto para aplicar el tema al cargar la página
  useEffect(() => {
    // Aplicar el tema guardado o por defecto
    const savedTheme = localStorage.getItem('theme') || 'claro';
    applyTheme(savedTheme);
  }, []);

  // Efecto para escuchar cambios en la preferencia del sistema
  useEffect(() => {
    if (theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e) => {
        if (theme === 'auto') {
          applyTheme('auto');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [theme]);

  const value = {
    theme,
    isDark,
    changeTheme,
    applyTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
