package com.example.controlador;

import com.example.entidad.Pedido;
import com.example.entidad.PedidoProducto;
import com.example.servicio.PedidoProductoServicio;
import com.example.servicio.PedidoServicio;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoControlador {

    @Autowired private PedidoServicio pedidoServicio;
    @Autowired private PedidoProductoServicio pedidoProductoServicio;

    @GetMapping
    public ResponseEntity<List<Pedido>> obtenerTodos() {
        return ResponseEntity.ok(pedidoServicio.obtenerTodosLosPedidos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerPorId(@PathVariable Long id) {
        Optional<Pedido> pedido = pedidoServicio.obtenerPedidoPorId(id);
        return pedido.isPresent() ? ResponseEntity.ok(pedido.get()) : ResponseEntity.notFound().build();
    }

    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Pedido>> porCliente(@PathVariable Long clienteId) {
        return ResponseEntity.ok(pedidoServicio.obtenerPedidosPorCliente(clienteId));
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Pedido>> porEstado(@PathVariable String estado) {
        return ResponseEntity.ok(pedidoServicio.obtenerPedidosPorEstado(estado));
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<?> actualizarEstado(@PathVariable Long id, @RequestParam String nuevoEstado) {
        boolean ok = pedidoServicio.actualizarEstado(id, nuevoEstado);
        return ok ? ResponseEntity.ok("Estado actualizado") : ResponseEntity.badRequest().body("No se pudo actualizar");
    }

    @GetMapping("/hoy")
    public ResponseEntity<List<Pedido>> delDia() {
        return ResponseEntity.ok(pedidoServicio.obtenerPedidosDelDia());
    }

    @GetMapping("/fecha")
    public ResponseEntity<List<Pedido>> porFecha(@RequestParam String fecha) {
        return ResponseEntity.ok(pedidoServicio.obtenerPedidosPorFecha(fecha));
    }

    @PostMapping("/{id}/enviar-whatsapp")
    public ResponseEntity<?> enviarWhatsApp(@PathVariable Long id) {
        boolean ok = pedidoServicio.enviarPedidoWhatsApp(id);
        return ok ? ResponseEntity.ok("Pedido enviado por WhatsApp")
                : ResponseEntity.badRequest().body("No se pudo enviar por WhatsApp");
    }

    // Líneas del pedido
    @GetMapping("/{pedidoId}/items")
    public ResponseEntity<List<PedidoProducto>> items(@PathVariable Long pedidoId) {
        return ResponseEntity.ok(pedidoProductoServicio.listarPorPedido(pedidoId));
    }

    // ENDPOINTS PARA HISTORIAL Y RANKING
    @GetMapping("/estadisticas")
    public ResponseEntity<?> obtenerEstadisticas() {
        return ResponseEntity.ok(pedidoServicio.obtenerEstadisticasGenerales());
    }

    @GetMapping("/ranking-productos")
    public ResponseEntity<?> obtenerRankingProductos() {
        return ResponseEntity.ok(pedidoServicio.obtenerRankingProductos());
    }

    @GetMapping("/historial-reciente")
    public ResponseEntity<List<Pedido>> obtenerHistorialReciente(@RequestParam(defaultValue = "10") int limite) {
        return ResponseEntity.ok(pedidoServicio.obtenerHistorialReciente(limite));
    }

    // ENDPOINT PARA CREAR PEDIDO DESDE CARTA DIGITAL
    @PostMapping("/crear-desde-carta")
    public ResponseEntity<?> crearPedidoDesdeCarta(@RequestBody Map<String, Object> pedidoData) {
        try {
            System.out.println("=== CREAR PEDIDO DESDE CARTA ===");
            System.out.println("Datos recibidos: " + pedidoData);
            
            // Extraer datos del pedido
            String nombreCliente = (String) pedidoData.get("nombre");
            String telefono = (String) pedidoData.get("telefono");
            String direccion = (String) pedidoData.get("direccion");
            String notas = (String) pedidoData.get("notas");
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> items = (List<Map<String, Object>>) pedidoData.get("items");
            
            System.out.println("Nombre: " + nombreCliente);
            System.out.println("Teléfono: " + telefono);
            System.out.println("Dirección: " + direccion);
            System.out.println("Notas: " + notas);
            System.out.println("Items: " + items);
            
            if (nombreCliente == null || telefono == null || items == null || items.isEmpty()) {
                System.out.println("ERROR: Datos incompletos");
                return ResponseEntity.badRequest().body("Datos del pedido incompletos");
            }
            
            // Crear el pedido
            Long pedidoId = pedidoServicio.crearPedidoDesdeCarta(nombreCliente, telefono, direccion, notas, items);
            
            if (pedidoId != null) {
                return ResponseEntity.ok(Map.of(
                    "pedidoId", pedidoId,
                    "mensaje", "Pedido creado exitosamente"
                ));
            } else {
                return ResponseEntity.badRequest().body("No se pudo crear el pedido");
            }
        } catch (Exception e) {
            System.err.println("Error al crear pedido desde carta: " + e.getMessage());
            return ResponseEntity.badRequest().body("Error interno del servidor");
        }
    }

    // ENDPOINT PARA GENERAR MENSAJE DE WHATSAPP DEL PEDIDO
    @GetMapping("/{id}/mensaje-whatsapp")
    public ResponseEntity<String> generarMensajeWhatsApp(@PathVariable Long id) {
        try {
            System.out.println("=== GENERANDO MENSAJE WHATSAPP PARA PEDIDO #" + id + " ===");
            
            Optional<Pedido> pedidoOpt = pedidoServicio.obtenerPedidoPorId(id);
            
            if (pedidoOpt.isEmpty()) {
                System.out.println("ERROR: Pedido no encontrado");
                return ResponseEntity.notFound().build();
            }
            
            Pedido pedido = pedidoOpt.get();
            System.out.println("Pedido encontrado: " + pedido.getId());
            System.out.println("Cliente: " + pedido.getCliente().getNombre());
            
            List<PedidoProducto> productos = pedidoProductoServicio.listarPorPedido(id);
            System.out.println("Productos encontrados: " + productos.size());
            
            // Construir mensaje
            StringBuilder mensaje = new StringBuilder();
            mensaje.append("🍕 *NUEVO PEDIDO #").append(pedido.getId()).append("*\n\n");
            mensaje.append("👤 *Cliente:* ").append(pedido.getCliente().getNombre());
            
            if (pedido.getCliente().getApellido() != null && !pedido.getCliente().getApellido().isEmpty()) {
                mensaje.append(" ").append(pedido.getCliente().getApellido());
            }
            mensaje.append("\n");
            
            if (pedido.getCliente().getDireccion() != null && !pedido.getCliente().getDireccion().isEmpty()) {
                mensaje.append("📍 *Dirección:* ").append(pedido.getCliente().getDireccion()).append("\n");
            }
            
            if (pedido.getNotas() != null && !pedido.getNotas().isEmpty()) {
                mensaje.append("📝 *Notas:* ").append(pedido.getNotas()).append("\n");
            }
            
            mensaje.append("\n🛒 *Detalle del pedido:*\n");
            
            if (productos.isEmpty()) {
                System.out.println("ADVERTENCIA: No se encontraron productos para el pedido");
                mensaje.append("• Sin productos\n");
            } else {
                for (PedidoProducto pp : productos) {
                    System.out.println("Producto: " + pp.getProducto().getNombre() + " x" + pp.getCantidad());
                    mensaje.append("• ").append(pp.getProducto().getNombre())
                           .append(" x").append(pp.getCantidad())
                           .append(" - $").append(pp.calcularSubtotal())
                           .append("\n");
                }
            }
            
            mensaje.append("\n💰 *Total: $").append(pedido.getTotal()).append("*\n");
            mensaje.append("\n¡Gracias por tu pedido! 🎉");
            
            System.out.println("Mensaje generado exitosamente");
            System.out.println("=== FIN GENERACIÓN MENSAJE ===");
            
            return ResponseEntity.ok(mensaje.toString());
            
        } catch (Exception e) {
            System.err.println("Error generando mensaje WhatsApp: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Error al generar mensaje: " + e.getMessage());
        }
    }
}


