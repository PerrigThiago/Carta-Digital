# FrontRoti - Sistema de Gestión de Restaurante

FrontRoti es una aplicación web moderna y completa para la gestión de restaurantes, construida con React 19 y Vite. Incluye un sistema de autenticación robusto, un dashboard administrativo completo y una interfaz de usuario intuitiva y responsive.

## 🚀 Características Principales

### Sistema de Autenticación
- ✅ Login seguro con validaciones
- ✅ Manejo de sesiones con localStorage
- ✅ Contexto global de autenticación
- ✅ Protección de rutas
- ✅ Logout automático

### Dashboard Administrativo
- ✅ **Menú Principal**: Estadísticas y acciones rápidas
- ✅ **Historial y Ranking**: Gestión de pedidos y productos
- ✅ **Configuraciones Web**: Ajustes del sistema y notificaciones

### Interfaz de Usuario
- ✅ Diseño moderno y responsive
- ✅ Navegación por pestañas intuitiva
- ✅ Componentes reutilizables
- ✅ Animaciones suaves y transiciones
- ✅ Compatible con móviles y tablets

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19, Vite
- **Estilos**: CSS Modules, CSS Variables
- **Estado**: React Hooks, Context API
- **Autenticación**: JWT (simulado), localStorage
- **Responsive**: CSS Grid, Flexbox, Media Queries

## 📁 Estructura del Proyecto

```
FrontRoti/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Login/
│   │   │   ├── Login.jsx          # Componente de login
│   │   │   ├── Login.css          # Estilos del login
│   │   │   └── index.js           # Exportación
│   │   └── Dashboard/
│   │       ├── Dashboard.jsx      # Dashboard principal
│   │       ├── Dashboard.css      # Estilos del dashboard
│   │       ├── Sidebar.jsx        # Barra lateral
│   │       ├── Sidebar.css        # Estilos de la barra lateral
│   │       ├── Menu.jsx           # Página principal
│   │       ├── Menu.css           # Estilos del menú
│   │       ├── HistorialRanking.jsx # Historial y ranking
│   │       ├── HistorialRanking.css # Estilos del historial
│   │       ├── ConfiguracionesWeb.jsx # Configuraciones
│   │       ├── ConfiguracionesWeb.css # Estilos de configuraciones
│   │       └── index.js           # Exportación
│   ├── context/
│   │   └── AuthContext.jsx        # Contexto de autenticación
│   ├── hooks/
│   │   └── useAuth.js             # Hook personalizado de auth
│   ├── utils/
│   │   └── auth.js                # Utilidades de autenticación
│   ├── App.jsx                    # Componente principal
│   ├── App.css                    # Estilos globales
│   └── main.jsx                   # Punto de entrada
├── package.json                   # Dependencias y scripts
├── vite.config.js                 # Configuración de Vite
└── README.md                      # Esta documentación
```

## 🚀 Instalación y Uso

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd FrontRoti
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Ejecutar en modo desarrollo
```bash
npm run dev
```

### 4. Construir para producción
```bash
npm run build
```

### 5. Vista previa de producción
```bash
npm run preview
```

## 🔐 Sistema de Autenticación

### Login
- **Email**: Cualquier email válido (ej: `usuario@email.com`)
- **Contraseña**: Mínimo 6 caracteres (ej: `123456`)

### Características de Seguridad
- Validación de formularios en tiempo real
- Manejo de errores de autenticación
- Persistencia de sesión en localStorage
- Logout automático al cerrar sesión

## 📱 Funcionalidades del Dashboard

### Menú Principal
- Estadísticas en tiempo real
- Acciones rápidas para tareas comunes
- Estado del sistema y servicios
- Indicadores de rendimiento

### Historial y Ranking
- **Historial de Pedidos**: Lista completa con filtros
- **Ranking de Productos**: Top 5 más vendidos
- **Estadísticas**: Métricas de negocio con indicadores de cambio

### Configuraciones Web
- **Configuración General**: Información del restaurante
- **Notificaciones**: Email, SMS y push notifications
- **Seguridad**: 2FA, sesiones y permisos
- **Backup**: Sistema de respaldo y restauración

## 🎨 Personalización

### Colores y Temas
Los estilos se pueden personalizar modificando las variables CSS en los archivos correspondientes:

```css
:root {
  --primary-color: #6366f1;      /* Color principal */
  --primary-hover: #4f46e5;      /* Color hover */
  --success-color: #10b981;      /* Color de éxito */
  --error-color: #ef4444;        /* Color de error */
  --warning-color: #f59e0b;      /* Color de advertencia */
}
```

### Componentes
Todos los componentes están diseñados para ser fácilmente personalizables:
- Estructura modular y reutilizable
- Props configurables
- Estilos CSS independientes
- Responsive design integrado

## 📱 Responsive Design

La aplicación está completamente optimizada para:
- **Desktop**: Layout completo con sidebar fijo
- **Tablet**: Sidebar colapsable y navegación adaptativa
- **Mobile**: Navegación vertical y componentes apilados

## 🔧 Desarrollo

### Scripts Disponibles
- `npm run dev`: Servidor de desarrollo
- `npm run build`: Construcción para producción
- `npm run lint`: Verificación de código
- `npm run preview`: Vista previa de producción

### Estructura de Componentes
Cada componente sigue las mejores prácticas de React:
- Functional components con hooks
- Props tipadas y documentadas
- Manejo de estado local y global
- Eventos y callbacks bien definidos

### Estilos CSS
- CSS Modules para encapsulación
- Variables CSS para consistencia
- Flexbox y Grid para layouts
- Media queries para responsive design

## 🚀 Próximos Pasos

### Funcionalidades Planificadas
1. **Sistema de Usuarios**: Roles y permisos
2. **API Backend**: Integración con servidor real
3. **Base de Datos**: Persistencia de datos
4. **Notificaciones**: Sistema de alertas en tiempo real
5. **Reportes**: Gráficos y análisis avanzados
6. **Móvil**: Aplicación nativa para iOS/Android

### Mejoras Técnicas
1. **Testing**: Jest y React Testing Library
2. **TypeScript**: Tipado estático
3. **PWA**: Progressive Web App
4. **Performance**: Lazy loading y optimizaciones
5. **SEO**: Meta tags y estructura semántica

## 🤝 Contribución

### Cómo Contribuir
1. Fork del repositorio
2. Crear rama para nueva funcionalidad
3. Implementar cambios con tests
4. Crear Pull Request con descripción detallada

### Estándares de Código
- ESLint para linting
- Prettier para formateo
- Conventional Commits para mensajes
- Componentes funcionales con hooks

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

### Recursos de Ayuda
- **Documentación**: Este README
- **Issues**: GitHub Issues para reportar bugs
- **Discusiones**: GitHub Discussions para preguntas
- **Wiki**: Documentación técnica detallada

### Contacto
- **Email**: soporte@frontroti.com
- **GitHub**: [@frontroti](https://github.com/frontroti)
- **Documentación**: [docs.frontroti.com](https://docs.frontroti.com)

---

**FrontRoti** - Transformando la gestión de restaurantes con tecnología moderna 🍕✨
