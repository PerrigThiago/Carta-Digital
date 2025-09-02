package com.example.controlador;

import com.example.entidad.Carrito;
import com.example.entidad.CarritoProducto;
import com.example.servicio.CarritoProductoServicio;
import com.example.servicio.CarritoServicio;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carritos")
@CrossOrigin(origins = "*")
public class CarritoControlador {

    @Autowired private CarritoServicio carritoServicio;
    @Autowired private CarritoProductoServicio carritoProductoServicio;

    // Crear carrito
    @PostMapping
    public ResponseEntity<?> crearCarrito(@RequestParam Long clienteId) {
        Carrito carrito = carritoServicio.crearCarrito(clienteId);
        return carrito != null ? ResponseEntity.ok(carrito)
                : ResponseEntity.badRequest().body("No se pudo crear el carrito");
    }

    // Obtener carrito por ID
    @GetMapping("/{carritoId}")
    public ResponseEntity<?> obtenerCarrito(@PathVariable Long carritoId) {
        Carrito carrito = carritoServicio.obtenerCarritoPorId(carritoId);
        return carrito != null ? ResponseEntity.ok(carrito) : ResponseEntity.notFound().build();
    }

    // Listar líneas del carrito
    @GetMapping("/{carritoId}/items")
    public ResponseEntity<List<CarritoProducto>> listarItems(@PathVariable Long carritoId) {
        return ResponseEntity.ok(carritoProductoServicio.listarPorCarrito(carritoId));
    }

    // Agregar producto al carrito
    @PostMapping("/{carritoId}/items")
    public ResponseEntity<?> agregarItem(
            @PathVariable Long carritoId,
            @RequestParam Long productoId,
            @RequestParam Integer cantidad) {
        boolean ok = carritoProductoServicio.agregarLinea(carritoId, productoId, cantidad);
        return ok ? ResponseEntity.ok("Producto agregado")
                : ResponseEntity.badRequest().body("No se pudo agregar el producto");
    }

    // Actualizar cantidad del item
    @PutMapping("/{carritoId}/items/{productoId}")
    public ResponseEntity<?> actualizarItem(
            @PathVariable Long carritoId,
            @PathVariable Long productoId,
            @RequestParam Integer cantidad) {
        boolean ok = carritoProductoServicio.actualizarCantidad(carritoId, productoId, cantidad);
        return ok ? ResponseEntity.ok("Cantidad actualizada")
                : ResponseEntity.badRequest().body("No se pudo actualizar la cantidad");
    }

    // Eliminar item
    @DeleteMapping("/{carritoId}/items/{productoId}")
    public ResponseEntity<?> eliminarItem(
            @PathVariable Long carritoId,
            @PathVariable Long productoId) {
        boolean ok = carritoProductoServicio.eliminarLinea(carritoId, productoId);
        return ok ? ResponseEntity.ok("Item eliminado")
                : ResponseEntity.badRequest().body("No se pudo eliminar el item");
    }

    // Vaciar carrito
    @DeleteMapping("/{carritoId}/vaciar")
    public ResponseEntity<?> vaciar(@PathVariable Long carritoId) {
        boolean ok = carritoProductoServicio.vaciarCarrito(carritoId);
        return ok ? ResponseEntity.ok("Carrito vaciado")
                : ResponseEntity.badRequest().body("No se pudo vaciar el carrito");
    }

    // Total del carrito
    @GetMapping("/{carritoId}/total")
    public ResponseEntity<?> total(@PathVariable Long carritoId) {
        Integer total = carritoServicio.calcularTotal(carritoId);
        return total != null ? ResponseEntity.ok(total)
                : ResponseEntity.badRequest().body("No se pudo calcular el total");
    }

    // Confirmar carrito → Pedido
    @PostMapping("/{carritoId}/confirmar")
    public ResponseEntity<?> confirmar(@PathVariable Long carritoId) {
        Long pedidoId = carritoServicio.confirmarCarrito(carritoId);
        return pedidoId != null ? ResponseEntity.ok("Pedido creado con ID: " + pedidoId)
                : ResponseEntity.badRequest().body("No se pudo confirmar el carrito");
    }
}


