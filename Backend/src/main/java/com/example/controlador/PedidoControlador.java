package com.example.controlador;

import com.example.entidad.Pedido;
import com.example.entidad.PedidoProducto;
import com.example.servicio.PedidoProductoServicio;
import com.example.servicio.PedidoServicio;
import java.util.List;
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
}


