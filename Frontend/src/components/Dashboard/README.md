# Módulo Dashboard

Este módulo proporciona un panel de control completo para la gestión del restaurante FrontRoti, con navegación lateral y múltiples funcionalidades.

## Características

- ✅ **Dashboard principal** con estadísticas y acciones rápidas
- ✅ **Barra lateral** con navegación completa
- ✅ **Módulo de Historial y Ranking** con tablas y estadísticas
- ✅ **Módulo de Configuraciones Web** para ajustes del sistema
- ✅ **Sistema de autenticación** integrado
- ✅ **Diseño responsive** para todos los dispositivos
- ✅ **Navegación por pestañas** en cada módulo

## Estructura de Archivos

```
src/components/Dashboard/
├── Dashboard.jsx              # Componente principal
├── Dashboard.css              # Estilos del dashboard
├── Sidebar.jsx                # Barra lateral de navegación
├── Sidebar.css                # Estilos de la barra lateral
├── Menu.jsx                   # Página principal del menú
├── Menu.css                   # Estilos del menú
├── HistorialRanking.jsx       # Módulo de historial y ranking
├── HistorialRanking.css       # Estilos del historial
├── ConfiguracionesWeb.jsx     # Módulo de configuraciones
├── ConfiguracionesWeb.css     # Estilos de configuraciones
├── index.js                   # Exportación del componente
└── README.md                  # Esta documentación
```

## Funcionalidades por Módulo

### 🏠 **Menú Principal**
- Panel de bienvenida personalizado
- Estadísticas en tiempo real (pedidos, ventas, clientes)
- Acciones rápidas (nuevo pedido, ver menú, clientes, reportes)
- Estado del sistema (online, base de datos, API)

### 📊 **Historial y Ranking**
- **Historial de Pedidos**: Tabla con filtros por estado y fecha
- **Ranking de Productos**: Top 5 productos más vendidos con ratings
- **Estadísticas Generales**: Métricas de rendimiento del negocio
- Filtros avanzados y acciones en cada pedido

### ⚙️ **Configuraciones Web**
- **Configuración General**: Información del restaurante, horarios, moneda
- **Notificaciones**: Email, SMS, push y recordatorios
- **Seguridad**: 2FA, sesiones, expiración de tokens
- **Backup y Restauración**: Copias de seguridad del sistema

## Navegación

### Barra Lateral
- **Logo y Branding**: FrontRoti con icono de pizza
- **Perfil de Usuario**: Avatar, nombre y email
- **Menú de Navegación**: Iconos y etiquetas descriptivas
- **Cerrar Sesión**: Botón destacado en la parte inferior

### Navegación por Pestañas
Cada módulo principal incluye navegación interna por pestañas para organizar mejor el contenido.

## Uso

### 1. Importar el Dashboard
```jsx
import Dashboard from './components/Dashboard';

function App() {
  return <Dashboard />;
}
```

### 2. Integración con Autenticación
```jsx
import { useAuthContext } from './context/AuthContext';

function AppContent() {
  const { isAuthenticated, isLoading } = useAuthContext();
  
  if (isLoading) return <LoadingSpinner />;
  return isAuthenticated ? <Dashboard /> : <Login />;
}
```

### 3. Personalización de Contenido
```jsx
// En Dashboard.jsx, modificar el renderContent()
const renderContent = () => {
  switch (activeTab) {
    case 'menu':
      return <Menu />;
    case 'historial':
      return <HistorialRanking />;
    // Agregar más casos según necesites
    default:
      return <Menu />;
  }
};
```

## Estilos y Temas

### Variables CSS
El sistema utiliza variables CSS para fácil personalización:
```css
:root {
  --primary-color: #6366f1;      /* Color principal */
  --primary-hover: #4f46e5;      /* Color hover */
  --sidebar-width: 280px;        /* Ancho de la barra lateral */
  --header-height: 70px;         /* Alto del header */
}
```

### Responsive Design
- **Desktop**: Barra lateral fija, contenido principal con margen
- **Tablet**: Barra lateral colapsable
- **Mobile**: Barra lateral overlay, contenido a pantalla completa

## Integración con Backend

### API Endpoints Sugeridos
```javascript
// Historial de pedidos
GET /api/orders/history?status=&date=&page=

// Estadísticas
GET /api/stats/dashboard

// Configuraciones
GET /api/settings
PUT /api/settings
POST /api/backup
POST /api/restore
```

### Estado de Autenticación
El dashboard se integra con el contexto de autenticación para:
- Verificar sesiones activas
- Obtener información del usuario
- Manejar logout y redirecciones

## Personalización

### Agregar Nuevos Módulos
1. Crear componente en `src/components/Dashboard/`
2. Agregar caso en `renderContent()` del Dashboard
3. Agregar opción en la barra lateral
4. Crear estilos CSS correspondientes

### Modificar Navegación
```jsx
// En Sidebar.jsx, modificar menuItems
const menuItems = [
  {
    id: 'nuevo-modulo',
    label: 'Nuevo Módulo',
    icon: '🔧',
    description: 'Descripción del módulo'
  }
  // ... otros módulos
];
```

## Dependencias

- React 19+
- Context API para estado global
- CSS moderno con variables y Grid/Flexbox
- Hooks personalizados para autenticación

## Compatibilidad

- ✅ Navegadores modernos (Chrome, Firefox, Safari, Edge)
- ✅ Dispositivos móviles y tablets
- ✅ React 18+ y 19+
- ✅ Vite y Create React App

## Próximos Pasos

1. **Integrar con APIs reales**: Conectar endpoints del backend
2. **Agregar gráficos**: Implementar Chart.js o D3.js para estadísticas
3. **Notificaciones en tiempo real**: WebSockets para actualizaciones
4. **Temas personalizables**: Modo oscuro/claro
5. **Internacionalización**: Soporte para múltiples idiomas
6. **PWA**: Convertir en aplicación web progresiva

## Soporte

Para dudas o problemas:
- Revisar los comentarios en el código
- Verificar la consola del navegador
- Consultar la documentación de React
- Revisar los logs de autenticación
