# Historial y Ranking - Carta Digital

## Funcionalidades Implementadas

### Backend (Spring Boot)

#### Nuevos Endpoints en PedidoControlador:
- `GET /api/pedidos/estadisticas` - Obtiene estadísticas generales del negocio
- `GET /api/pedidos/ranking-productos` - Obtiene ranking de productos más vendidos
- `GET /api/pedidos/historial-reciente?limite=10` - Obtiene historial reciente de pedidos

#### Nuevos Métodos en PedidoServicio:
- `obtenerEstadisticasGenerales()` - Calcula estadísticas de ventas, pedidos y tiempos
- `obtenerRankingProductos()` - Agrupa productos por ventas y calcula rankings
- `obtenerHistorialReciente(int limite)` - Obtiene pedidos ordenados por fecha

### Frontend (React)

#### Nuevos Archivos:
- `src/services/historialRankingService.js` - Servicio para llamadas a la API
- `src/hooks/useHistorialRanking.js` - Hook personalizado para manejo de estado

#### Componente HistorialRanking Actualizado:
- **Pestaña Historial**: Muestra pedidos reales con filtros por estado y fecha
- **Pestaña Ranking**: Muestra productos ordenados por ventas con estadísticas
- **Pestaña Estadísticas**: Muestra métricas del negocio con gráficos

## Características Principales

### 1. Historial de Pedidos
- ✅ Lista de pedidos recientes con datos reales
- ✅ Filtros por estado (Pendiente, Confirmado, En Preparación, etc.)
- ✅ Filtro por fecha
- ✅ Estados visuales con colores distintivos
- ✅ Información de cliente y totales

### 2. Ranking de Productos
- ✅ Top productos más vendidos
- ✅ Estadísticas de ventas e ingresos
- ✅ Ratings simulados
- ✅ Medallas para top 3
- ✅ Información detallada de cada producto

### 3. Estadísticas Generales
- ✅ Total de ventas con cambio porcentual
- ✅ Número total de pedidos
- ✅ Tiempo promedio de preparación
- ✅ Pedidos completados con porcentaje
- ✅ Resumen de actividad

## Cómo Probar

### 1. Iniciar el Backend
```bash
cd Carta-Digital/Backend
mvn spring-boot:run
```

### 2. Iniciar el Frontend
```bash
cd Carta-Digital/Frontend
npm install
npm run dev
```

### 3. Acceder al Dashboard
1. Inicia sesión en la aplicación
2. Navega a "Historial y Ranking" en el sidebar
3. Explora las tres pestañas:
   - **Historial**: Ve los pedidos recientes y usa los filtros
   - **Ranking**: Revisa los productos más vendidos
   - **Estadísticas**: Analiza las métricas del negocio

## Datos de Prueba

Para probar completamente la funcionalidad, asegúrate de tener:
1. Productos creados en el sistema
2. Pedidos realizados con diferentes estados
3. Productos agregados a pedidos (PedidoProducto)

## Estados de Pedidos Soportados

- `PENDIENTE` - Pedido creado, esperando confirmación
- `CONFIRMADO` - Pedido confirmado por el restaurante
- `EN_PREPARACION` - Pedido en proceso de preparación
- `LISTO` - Pedido listo para entrega
- `ENTREGADO` - Pedido entregado al cliente
- `CANCELADO` - Pedido cancelado

## Mejoras Futuras

- [ ] Gráficos interactivos reales (Chart.js o similar)
- [ ] Exportación de reportes en PDF/Excel
- [ ] Filtros de fecha más avanzados (rango de fechas)
- [ ] Notificaciones en tiempo real
- [ ] Análisis de tendencias temporales
- [ ] Comparativas entre períodos

## Notas Técnicas

- Los datos se cargan automáticamente al montar el componente
- Manejo de estados de carga y error
- Diseño responsive para móviles
- Soporte para modo oscuro
- Filtros reactivos que actualizan la vista en tiempo real
