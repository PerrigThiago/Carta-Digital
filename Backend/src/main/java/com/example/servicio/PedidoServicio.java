package com.example.servicio;

import com.example.entidad.Pedido;
import com.example.entidad.PedidoProducto;
import com.example.repositorio.PedidoRepositorio;
import com.example.repositorio.PedidoProductoRepositorio;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServicio {

    @Autowired
    private PedidoRepositorio pedidoRepositorio;
    
    @Autowired
    private PedidoProductoRepositorio pedidoProductoRepositorio;

    public List<Pedido> obtenerTodosLosPedidos() {
        try {
            return pedidoRepositorio.findAll();
        } catch (Exception e) {
            System.err.println("Error al obtener todos los pedidos: " + e.getMessage());
            return List.of();
        }
    }

    public Optional<Pedido> obtenerPedidoPorId(Long id) {
        try {
            if (id == null || id <= 0) {
                return Optional.empty();
            }
            return pedidoRepositorio.findById(id);
        } catch (Exception e) {
            System.err.println("Error al obtener pedido por ID: " + e.getMessage());
            return Optional.empty();
        }
    }

    public List<Pedido> obtenerPedidosPorCliente(Long clienteId) {
        try {
            if (clienteId == null || clienteId <= 0) {
                return List.of();
            }
            return pedidoRepositorio.findByClienteId(clienteId);
        } catch (Exception e) {
            System.err.println("Error al obtener pedidos por cliente: " + e.getMessage());
            return List.of();
        }
    }

    public List<Pedido> obtenerPedidosPorEstado(String estado) {
        try {
            if (estado == null || estado.trim().isEmpty()) {
                return List.of();
            }
            return pedidoRepositorio.findByEstado(estado);
        } catch (Exception e) {
            System.err.println("Error al obtener pedidos por estado: " + e.getMessage());
            return List.of();
        }
    }

    public boolean actualizarEstado(Long id, String nuevoEstado) {
        try {
            if (id == null || id <= 0 || nuevoEstado == null || nuevoEstado.trim().isEmpty()) {
                return false;
            }
            Optional<Pedido> pedidoOpt = pedidoRepositorio.findById(id);
            if (pedidoOpt.isEmpty()) {
                return false;
            }
            Pedido pedido = pedidoOpt.get();
            pedido.setEstado(nuevoEstado);
            pedidoRepositorio.save(pedido);
            return true;
        } catch (Exception e) {
            System.err.println("Error al actualizar estado del pedido: " + e.getMessage());
            return false;
        }
    }

    public List<Pedido> obtenerPedidosDelDia() {
        try {
            return pedidoRepositorio.findByFecha(LocalDate.now());
        } catch (Exception e) {
            System.err.println("Error al obtener pedidos del día: " + e.getMessage());
            return List.of();
        }
    }

    public List<Pedido> obtenerPedidosPorFecha(String fechaIso) {
        try {
            LocalDate fecha = LocalDate.parse(fechaIso);
            return pedidoRepositorio.findByFecha(fecha);
        } catch (Exception e) {
            System.err.println("Error al obtener pedidos por fecha: " + e.getMessage());
            return List.of();
        }
    }

    public boolean enviarPedidoWhatsApp(Long id) {
        return false;
    }

    // MÉTODOS PARA HISTORIAL Y RANKING
    public Map<String, Object> obtenerEstadisticasGenerales() {
        try {
            List<Pedido> todosLosPedidos = pedidoRepositorio.findAll();
            
            // Calcular estadísticas básicas
            int totalPedidos = todosLosPedidos.size();
            int pedidosCompletados = (int) todosLosPedidos.stream()
                .filter(p -> "ENTREGADO".equals(p.getEstado()))
                .count();
            
            int totalVentas = todosLosPedidos.stream()
                .mapToInt(Pedido::getTotal)
                .sum();
            
            // Calcular tiempo promedio (simulado)
            int tiempoPromedio = 25; // minutos
            
            // Calcular cambios porcentuales (simulados para demo)
            double cambioVentas = 12.0; // +12%
            double cambioPedidos = 8.0; // +8%
            double cambioTiempo = -5.0; // -5%
            
            Map<String, Object> estadisticas = new HashMap<>();
            estadisticas.put("totalVentas", totalVentas);
            estadisticas.put("totalPedidos", totalPedidos);
            estadisticas.put("pedidosCompletados", pedidosCompletados);
            estadisticas.put("tiempoPromedio", tiempoPromedio);
            estadisticas.put("cambioVentas", cambioVentas);
            estadisticas.put("cambioPedidos", cambioPedidos);
            estadisticas.put("cambioTiempo", cambioTiempo);
            
            return estadisticas;
        } catch (Exception e) {
            System.err.println("Error al obtener estadísticas: " + e.getMessage());
            return new HashMap<>();
        }
    }

    public List<Map<String, Object>> obtenerRankingProductos() {
        try {
            // Obtener todos los productos de pedidos
            List<PedidoProducto> productosPedidos = pedidoProductoRepositorio.findAll();
            
            // Agrupar por producto y calcular ventas
            Map<Long, Map<String, Object>> rankingMap = productosPedidos.stream()
                .collect(Collectors.groupingBy(
                    pp -> pp.getProducto().getId(),
                    Collectors.collectingAndThen(
                        Collectors.toList(),
                        lista -> {
                            Map<String, Object> datos = new HashMap<>();
                            datos.put("productoId", lista.get(0).getProducto().getId());
                            datos.put("nombre", lista.get(0).getProducto().getNombre());
                            datos.put("ventas", lista.stream().mapToInt(PedidoProducto::getCantidad).sum());
                            datos.put("ingresos", lista.stream().mapToInt(pp -> pp.getPrecio() * pp.getCantidad()).sum());
                            // Rating simulado para demo
                            datos.put("rating", 4.0 + Math.random() * 1.0);
                            return datos;
                        }
                    )
                ));
            
            // Convertir a lista y ordenar por ventas
            return rankingMap.values().stream()
                .sorted((a, b) -> Integer.compare((Integer) b.get("ventas"), (Integer) a.get("ventas")))
                .limit(10) // Top 10
                .collect(Collectors.toList());
                
        } catch (Exception e) {
            System.err.println("Error al obtener ranking de productos: " + e.getMessage());
            return List.of();
        }
    }

    public List<Pedido> obtenerHistorialReciente(int limite) {
        try {
            return pedidoRepositorio.findAll().stream()
                .sorted((a, b) -> b.getFecha().compareTo(a.getFecha()))
                .limit(limite)
                .collect(Collectors.toList());
        } catch (Exception e) {
            System.err.println("Error al obtener historial reciente: " + e.getMessage());
            return List.of();
        }
    }
}