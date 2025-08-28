package com.example.CartaDigital.controlador;

import java.util.List;
import java.util.Optional;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.CartaDigital.entidad.Producto;
import com.example.CartaDigital.servicio.ProductoServicio;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoControlador {
    
    @Autowired
    private ProductoServicio productoServicio;

    // ENDPOINTS CRUD BASICO

    // POST - Crear producto
    @PostMapping
    public ResponseEntity<?> crearProducto(@RequestBody Producto producto) {
        Producto productoCreado = productoServicio.crearProducto(producto);

        if (productoCreado != null) {
            return ResponseEntity.ok(productoCreado);
        } else {
            return ResponseEntity.badRequest().body("No se puedo crear el producto");
        }
    }

    // GET - Obtener todos los productos
    @GetMapping
    public ResponseEntity<List<Producto>> obtenerTodosLosProductos() {
        List<Producto> productos = productoServicio.obtenerTodosLosProductos();
        return ResponseEntity.ok(productos);
    }

    // GET - Obtener producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerProductoPorId(@PathVariable Long id) {
        Optional<Producto> producto = productoServicio.obtenerProductoPorId(id);

        if (producto.isPresent()) {
            return ResponseEntity.ok(producto.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // PUT - Actualizar producto
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarProducto(@PathVariable Long id, @RequestBody Producto producto) {
        producto.setId(id);
        Producto productoActualizado = productoServicio.actualizarProducto(id, producto);

        if (productoActualizado != null) {
            return ResponseEntity.ok(productoActualizado);
        } else {
            return ResponseEntity.badRequest().body("No se puedo actualizar el producto");
        }
    }

    // DELETE - Eliminar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarProducto(@PathVariable Long id) {
        boolean eliminado = productoServicio.eliminarProducto(id);

        if (eliminado) {
            return ResponseEntity.ok("Producto eliminado correctamente");
        } else {
            return ResponseEntity.badRequest().body("No se puedo eliminar el producto");
        }
    }

    // ENDPOINTS ESPECIALES PERSONALIZADOS PARA CARTA DIGITAL

    // GET - Productos disponibles (carta publica)
    @GetMapping("/disponibles")
    public ResponseEntity<List<Producto>> obtenerProductosDisponibles() {
        List<Producto> productos = productoServicio.obtenerProductosDisponibles();
        return ResponseEntity.ok(productos);
    }

    // GET - Productos por grupo
    @GetMapping("/grupo/{grupo}")
    public ResponseEntity<List<Producto>> obtenerProductosPorGrupo(@PathVariable String grupo) {
        List<Producto> productos = productoServicio.obtenerProductosPorGrupo(grupo);
        return ResponseEntity.ok(productos);
    }

    // GET - Búsqueda por nombre
    @GetMapping("/buscar")
    public ResponseEntity<List<Producto>> buscarProductosPorNombre(@RequestParam String nombre) {
        List<Producto> productos = productoServicio.buscarProductosPorNombre(nombre);
        return ResponseEntity.ok(productos);
    }
    
    // GET - Productos por rango de precio
    @GetMapping("/precio")
    public ResponseEntity<List<Producto>> obtenerProductosPorRangoPrecio(
            @RequestParam Integer precioMinimo,
            @RequestParam Integer precioMaximo) {
        
        List<Producto> productos = productoServicio.obtenerProductosPorRangoPrecio(precioMinimo, precioMaximo);
        return ResponseEntity.ok(productos);
    }
    
    // GET - Productos con stock bajo (para administradores)
    @GetMapping("/stock-bajo")
    public ResponseEntity<List<Producto>> obtenerProductosConStockBajo() {
        List<Producto> productos = productoServicio.obtenerProductosConStockBajo();
        return ResponseEntity.ok(productos);
    }
    
    // GET - Productos sin stock
    @GetMapping("/sin-stock")
    public ResponseEntity<List<Producto>> obtenerProductosSinStock() {
        List<Producto> productos = productoServicio.obtenerProductosSinStock();
        return ResponseEntity.ok(productos);
    }
    
    // POST - Reducir stock (para ventas)
    @PostMapping("/{id}/reducir-stock")
    public ResponseEntity<?> reducirStock(
            @PathVariable Long id,
            @RequestParam Integer cantidad) {
        
        boolean stockReducido = productoServicio.reducirStock(id, cantidad);
        
        if (stockReducido) {
            return ResponseEntity.ok("Stock reducido correctamente");
        } else {
            return ResponseEntity.badRequest().body("Stock insuficiente o producto no encontrado");
        }
    }
    
    // GET - Verificar stock
    @GetMapping("/{id}/verificar-stock")
    public ResponseEntity<?> verificarStock(
            @PathVariable Long id,
            @RequestParam Integer cantidad) {
        
        boolean hayStock = productoServicio.verificarStock(id, cantidad);
        
        if (hayStock) {
            return ResponseEntity.ok("Stock disponible");
        } else {
            return ResponseEntity.ok("Stock insuficiente");
        }
    }
    
    // GET - Productos por usuario (administrador)
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Producto>> obtenerProductosPorUsuario(@PathVariable Long usuarioId) {

        // Implementar este método en el Service
        return ResponseEntity.ok(List.of());
    }
    
    // GET - Estadísticas de productos
    @GetMapping("/estadisticas")
    public ResponseEntity<?> obtenerEstadisticas() {
        try {
            // Contar productos por disponibilidad
            List<Producto> disponibles = productoServicio.obtenerProductosDisponibles();
            List<Producto> sinStock = productoServicio.obtenerProductosSinStock();
            List<Producto> stockBajo = productoServicio.obtenerProductosConStockBajo();
            
            // Crear objeto de estadísticas
            Map<String, Integer> estadisticas = Map.of(
                "totalDisponibles", disponibles.size(),
                "totalSinStock", sinStock.size(),
                "totalStockBajo", stockBajo.size(),
                "totalProductos", productoServicio.obtenerTodosLosProductos().size()
            );
            
            return ResponseEntity.ok(estadisticas);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al obtener estadísticas");
        }
    }
}