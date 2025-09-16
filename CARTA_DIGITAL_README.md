# Carta Digital - Restaurante

## Descripción

La Carta Digital es una aplicación web pública que permite a los clientes ver el menú del restaurante, agregar productos a su carrito y realizar pedidos directamente desde su dispositivo.

## Características Principales

### 🍽️ **Catálogo de Productos**
- Visualización de todos los productos disponibles
- Filtros por categorías (Pizzas, Bebidas, Postres, etc.)
- Búsqueda de productos por nombre
- Información detallada: precio, descripción, disponibilidad
- Diseño atractivo con iconos y colores

### 🛒 **Carrito de Compras**
- Agregar/eliminar productos
- Modificar cantidades
- Cálculo automático del total
- Persistencia en localStorage
- Interfaz intuitiva y responsive

### 📋 **Proceso de Pedido**
- Formulario de datos del cliente
- Resumen del pedido
- Validación de campos obligatorios
- Confirmación y feedback visual
- Integración con el backend

## Cómo Acceder

### Opción 1: URL Directa
```
http://localhost:3000/carta
```

### Opción 2: Desde el Dashboard Admin
1. Inicia sesión en el dashboard admin
2. Ve a la sección de configuración
3. Copia el enlace de la carta digital
4. Compártelo con tus clientes

## Flujo del Cliente

### 1. **Explorar el Menú**
- El cliente accede a `/carta`
- Ve todos los productos organizados por categorías
- Puede filtrar por categoría o buscar productos específicos
- Cada producto muestra precio, descripción y disponibilidad

### 2. **Agregar al Carrito**
- Hace clic en "Agregar al Pedido" en cualquier producto
- El producto se agrega al carrito
- Puede ver el contador de items en el header
- El carrito se guarda automáticamente en el navegador

### 3. **Revisar el Carrito**
- Hace clic en "Mi Pedido" en el header
- Ve todos los productos seleccionados
- Puede modificar cantidades o eliminar productos
- Ve el total calculado automáticamente

### 4. **Confirmar Pedido**
- Hace clic en "Proceder al Pedido"
- Completa sus datos de contacto (nombre y teléfono obligatorios)
- Agrega dirección de entrega (opcional)
- Incluye notas especiales (opcional)
- Confirma el pedido

### 5. **Confirmación**
- Ve la pantalla de confirmación
- Recibe el ID del pedido
- El pedido se envía automáticamente al restaurante
- El carrito se limpia automáticamente

## Integración con el Backend

### Endpoints Utilizados

#### Productos
- `GET /api/productos/disponibles` - Obtener productos disponibles
- `GET /api/productos/grupo/{grupo}` - Productos por categoría
- `GET /api/productos/buscar?nombre={nombre}` - Buscar productos

#### Pedidos
- `POST /api/pedidos/crear-desde-carta` - Crear pedido desde la carta

#### Clientes
- `POST /api/clientes` - Crear cliente
- `GET /api/clientes/buscar?telefono={telefono}` - Buscar cliente por teléfono

## Configuración del Admin

### 1. **Crear Productos**
1. Ve al dashboard admin
2. Navega a "Menú Principal"
3. Crea productos con:
   - Nombre
   - Precio
   - Categoría (grupo)
   - Descripción
   - Disponibilidad

### 2. **Gestionar Pedidos**
1. Ve a "Historial y Ranking"
2. Revisa los pedidos entrantes
3. Actualiza el estado de los pedidos
4. Ve estadísticas de ventas

### 3. **Configurar Categorías**
- Las categorías se crean automáticamente al crear productos
- Usa nombres consistentes para agrupar productos
- Ejemplos: "PIZZAS", "BEBIDAS", "POSTRES", "ENTRADAS"

## Personalización

### Colores y Estilo
- Los colores se pueden modificar en los archivos CSS
- Paleta principal: gradiente azul-púrpura
- Colores de acento: verde para precios, rojo para acciones

### Iconos de Productos
- Se asignan automáticamente según la categoría
- Pizzas: 🍕
- Bebidas: 🥤
- Postres: 🍰
- Entradas: 🥗
- Otros: 🍽️

### Textos y Mensajes
- Todos los textos están en español
- Mensajes de error y confirmación personalizables
- Placeholders informativos en formularios

## Responsive Design

### Móviles
- Diseño optimizado para pantallas pequeñas
- Navegación táctil
- Botones grandes y fáciles de usar
- Formularios adaptados

### Tablets
- Grid de productos adaptativo
- Navegación fluida
- Mejor aprovechamiento del espacio

### Escritorio
- Diseño completo con todas las funcionalidades
- Navegación con teclado
- Hover effects y transiciones

## Tecnologías Utilizadas

### Frontend
- **React 19** - Framework principal
- **React Router** - Navegación
- **CSS3** - Estilos y animaciones
- **JavaScript ES6+** - Lógica de la aplicación

### Backend
- **Spring Boot** - API REST
- **JPA/Hibernate** - Persistencia
- **MySQL** - Base de datos

## Próximas Mejoras

- [ ] **Notificaciones en tiempo real** - WebSocket para actualizaciones
- [ ] **Pagos en línea** - Integración con pasarelas de pago
- [ ] **Sistema de calificaciones** - Reseñas de productos
- [ ] **Favoritos** - Lista de productos favoritos
- [ ] **Historial de pedidos** - Para clientes registrados
- [ ] **Descuentos y promociones** - Sistema de cupones
- [ ] **Múltiples idiomas** - Soporte internacional
- [ ] **PWA** - Aplicación web progresiva

## Soporte

Para soporte técnico o consultas sobre la implementación, contacta al equipo de desarrollo.

---

**¡Disfruta de tu nueva carta digital! 🍕✨**
