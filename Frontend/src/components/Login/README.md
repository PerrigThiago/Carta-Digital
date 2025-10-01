# Módulo de Login

Este módulo proporciona un sistema completo de autenticación para tu aplicación React.

## Características

- ✅ Formulario de login con validaciones
- ✅ Manejo de estado con React Hooks
- ✅ Estilos CSS modernos y responsivos
- ✅ Sistema de autenticación con contexto global
- ✅ Manejo de errores y estados de carga
- ✅ Persistencia de sesión en localStorage
- ✅ Diseño responsive para móviles

## Estructura de Archivos

```
src/
├── components/
│   └── Login/
│       ├── Login.jsx          # Componente principal
│       ├── Login.css          # Estilos del componente
│       ├── index.js           # Exportación del componente
│       └── README.md          # Esta documentación
├── context/
│   └── AuthContext.jsx        # Contexto de autenticación
├── hooks/
│   └── useAuth.js             # Hook personalizado para auth
└── utils/
    └── auth.js                # Utilidades de autenticación
```

## Uso Básico

### 1. Importar el componente

```jsx
import Login from './components/Login';

function App() {
  return (
    <div>
      <Login />
    </div>
  );
}
```

### 2. Usar el contexto de autenticación

```jsx
import { useAuthContext } from './context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthContext();
  
  if (isAuthenticated) {
    return (
      <div>
        <p>Bienvenido, {user.name}!</p>
        <button onClick={logout}>Cerrar Sesión</button>
      </div>
    );
  }
  
  return <Login />;
}
```

### 3. Envolver tu app con el AuthProvider

```jsx
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Tu aplicación aquí */}
    </AuthProvider>
  );
}
```

## Funcionalidades

### Validaciones del Formulario

- **Email**: Requerido y formato válido
- **Contraseña**: Mínimo 6 caracteres
- **Manejo de errores**: Mensajes claros y visuales

### Estados del Componente

- **Carga**: Indicador visual durante el login
- **Errores**: Manejo de errores de validación y API
- **Éxito**: Redirección automática después del login

### Persistencia

- **Token JWT**: Almacenado en localStorage
- **Usuario**: Datos del usuario persistidos
- **Sesión**: Verificación automática al cargar la app

## Personalización

### Colores y Estilos

Los estilos se pueden personalizar modificando las variables CSS en `Login.css`:

```css
:root {
  --primary-color: #6366f1;      /* Color principal */
  --primary-hover: #4f46e5;      /* Color hover */
  --error-color: #ef4444;        /* Color de error */
  --success-color: #10b981;      /* Color de éxito */
}
```

### Integración con API

Para conectar con tu backend, modifica la función `login` en `utils/auth.js`:

```javascript
login: async (credentials) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  if (!response.ok) {
    throw new Error('Credenciales inválidas');
  }
  
  return response.json();
}
```

## Dependencias

- React 19+
- Hooks nativos de React
- CSS moderno con variables CSS

## Compatibilidad

- ✅ Navegadores modernos
- ✅ Dispositivos móviles
- ✅ React 18+ y 19+
- ✅ Vite y Create React App

## Próximos Pasos

1. **Integrar con tu backend**: Modifica `utils/auth.js`
2. **Agregar rutas protegidas**: Usa React Router con el contexto
3. **Implementar registro**: Crea componente similar para signup
4. **Agregar recuperación de contraseña**: Implementa el enlace "¿Olvidaste tu contraseña?"
5. **Mejorar seguridad**: Implementa refresh tokens y expiración

## Soporte

Si tienes alguna pregunta o necesitas ayuda, revisa:
- Los comentarios en el código
- La documentación de React Hooks
- Los logs de la consola del navegador
