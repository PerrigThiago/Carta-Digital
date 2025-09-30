# Integración Frontend-Backend - Carta Digital

## Descripción
Este documento describe la integración completa entre el frontend React y el backend Spring Boot para el sistema de Carta Digital.

## Estructura de la Integración

### 1. Servicios de API
- **`src/services/productService.js`** - Gestión de productos
- **`src/services/orderService.js`** - Gestión de pedidos
- **`src/services/cartService.js`** - Gestión del carrito
- **`src/services/clientService.js`** - Gestión de clientes
- **`src/services/webConfigService.js`** - Configuraciones web

### 2. Hooks Personalizados
- **`src/hooks/useProducts.js`** - Estado y operaciones de productos
- **`src/hooks/useOrders.js`** - Estado y operaciones de pedidos
- **`src/hooks/useCart.js`** - Estado y operaciones del carrito
- **`src/hooks/useClients.js`** - Estado y operaciones de clientes
- **`src/hooks/useWebConfig.js`** - Estado y operaciones de configuraciones

### 3. Configuración
- **`src/config/apiConfig.js`** - Configuración de la API y constantes
- **`src/config/environment.js`** - Configuración por entornos
- **`src/utils/auth.js`** - Utilidades de autenticación actualizadas

## Configuración del Backend

### Requisitos
- Java 21
- Spring Boot 3.5.4
- MySQL 8.0+
- Maven

### Base de Datos
```sql
-- Crear la base de datos
CREATE DATABASE carta_digital;
USE carta_digital;

-- La aplicación creará automáticamente las tablas con JPA
```

### Configuración de application.properties
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/carta_digital
spring.datasource.username=root
spring.datasource.password=thiago
server.port=8080
```

## Configuración del Frontend

### Variables de Entorno
El frontend está configurado para conectarse a `http://localhost:8080/api` por defecto.

### Instalación de Dependencias
```bash
cd Frontend1
npm install
```

## Uso de los Hooks

### Ejemplo: Gestión de Productos
```jsx
import { useProducts } from '../hooks/useProducts';

function ProductList() {
  const { 
    products, 
    loading, 
    error, 
    createProduct, 
    updateProduct, 
    deleteProduct 
  } = useProducts();

  // Los productos se cargan automáticamente
  // Usar las funciones para CRUD
}
```

### Ejemplo: Gestión del Carrito
```jsx
import { useCart } from '../hooks/useCart';

function Cart() {
  const { 
    cartItems, 
    total, 
    addToCart, 
    removeFromCart, 
    updateQuantity 
  } = useCart();

  // Funciones para manejar el carrito
}
```

## Endpoints de la API

### Usuarios
- `POST /api/usuarios/login` - Autenticación
- `GET /api/usuarios` - Listar usuarios
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/{id}` - Actualizar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario

### Productos
- `GET /api/productos` - Listar productos
- `GET /api/productos/{id}` - Obtener producto
- `POST /api/productos` - Crear producto
- `PUT /api/productos/{id}` - Actualizar producto
- `DELETE /api/productos/{id}` - Eliminar producto

### Pedidos
- `GET /api/pedidos` - Listar pedidos
- `GET /api/pedidos/{id}` - Obtener pedido
- `POST /api/pedidos` - Crear pedido
- `PUT /api/pedidos/{id}` - Actualizar pedido
- `DELETE /api/pedidos/{id}` - Eliminar pedido

### Carrito
- `GET /api/carritos` - Listar carritos
- `POST /api/carritos` - Crear carrito
- `POST /api/carrito-productos` - Agregar producto al carrito
- `PUT /api/carrito-productos/{id}` - Actualizar cantidad
- `DELETE /api/carrito-productos/{id}` - Remover producto

### Clientes
- `GET /api/clientes` - Listar clientes
- `GET /api/clientes/{id}` - Obtener cliente
- `POST /api/clientes` - Crear cliente
- `PUT /api/clientes/{id}` - Actualizar cliente
- `DELETE /api/clientes/{id}` - Eliminar cliente

### Parámetros Web
- `GET /api/parametros-web` - Listar parámetros
- `GET /api/parametros-web/{id}` - Obtener parámetro
- `POST /api/parametros-web` - Crear parámetro
- `PUT /api/parametros-web/{id}` - Actualizar parámetro
- `DELETE /api/parametros-web/{id}` - Eliminar parámetro

## Flujo de Autenticación

1. **Login**: El usuario ingresa email y contraseña
2. **Validación**: Se convierte el email a username para el backend
3. **Autenticación**: Se envía petición al endpoint `/api/usuarios/login`
4. **Token**: Se genera un token JWT simulado (en producción usar JWT real)
5. **Almacenamiento**: Se guarda el token y datos del usuario en localStorage
6. **Peticiones**: Todas las peticiones incluyen el token en el header Authorization

## Manejo de Errores

### Errores de Red
- Timeout de 10 segundos
- Reintentos automáticos (3 intentos)
- Mensajes de error descriptivos

### Errores de Validación
- Validación del lado del cliente
- Validación del lado del servidor
- Mensajes de error específicos por campo

## Características de la Integración

### ✅ Implementado
- [x] Servicios de API para todas las entidades
- [x] Hooks personalizados con estado local
- [x] Manejo de errores y loading states
- [x] Filtros y búsquedas
- [x] CRUD completo para todas las entidades
- [x] Autenticación integrada
- [x] Configuración por entornos
- [x] Manejo de CORS

### 🔄 Pendiente de Implementar
- [ ] JWT real en el backend
- [ ] Refresh tokens
- [ ] Paginación en el backend
- [ ] Subida de archivos (imágenes)
- [ ] WebSockets para notificaciones en tiempo real
- [ ] Cache de datos
- [ ] Interceptores de red más avanzados

## Pruebas

### Backend
```bash
cd Backend
mvn spring-boot:run
```

### Frontend
```bash
cd Frontend1
npm run dev
```

### Verificar Integración
1. El backend debe estar corriendo en `http://localhost:8080`
2. El frontend debe estar corriendo en `http://localhost:5173`
3. Probar login con credenciales válidas
4. Verificar que se cargan los datos desde el backend

## Solución de Problemas

### Error de CORS
- Verificar que el backend tenga `@CrossOrigin(origins = "*")`
- Verificar que el frontend use la URL correcta

### Error de Conexión
- Verificar que MySQL esté corriendo
- Verificar credenciales de la base de datos
- Verificar que el puerto 8080 esté libre

### Error de Autenticación
- Verificar que existan usuarios en la base de datos
- Verificar que el endpoint de login funcione
- Revisar logs del backend

## Notas de Producción

1. **Cambiar URLs**: Actualizar `environment.js` con URLs de producción
2. **JWT Real**: Implementar JWT real en el backend
3. **HTTPS**: Usar HTTPS en producción
4. **Rate Limiting**: Implementar límites de peticiones
5. **Logging**: Configurar logging apropiado
6. **Monitoreo**: Implementar monitoreo de la aplicación

## Contacto
Para soporte técnico o preguntas sobre la integración, contactar al equipo de desarrollo.
