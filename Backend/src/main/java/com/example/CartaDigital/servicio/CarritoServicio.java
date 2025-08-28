package com.example.CartaDigital.servicio;

import com.example.CartaDigital.entidad.Carrito;
import com.example.CartaDigital.entidad.CarritoProducto;
import com.example.CartaDigital.entidad.Cliente;
import com.example.CartaDigital.entidad.Pedido;
import com.example.CartaDigital.entidad.PedidoProducto;
import com.example.CartaDigital.entidad.Producto;
import com.example.CartaDigital.repositorio.CarritoProductoRepositorio;
import com.example.CartaDigital.repositorio.CarritoRepositorio;
import com.example.CartaDigital.repositorio.PedidoProductoRepositorio;
import com.example.CartaDigital.repositorio.PedidoRepositorio;
import com.example.CartaDigital.repositorio.ProductoRepositorio;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarritoServicio {

    @Autowired private CarritoRepositorio carritoRepositorio;
    @Autowired private CarritoProductoRepositorio carritoProductoRepositorio;
    @Autowired private ProductoRepositorio productoRepositorio;
    @Autowired private PedidoRepositorio pedidoRepositorio;
    @Autowired private PedidoProductoRepositorio pedidoProductoRepositorio;

    public Carrito crearCarrito(Long clienteId) {
        try {
            if (clienteId == null || clienteId <= 0) return null;
            Carrito carrito = new Carrito();
            Cliente cliente = new Cliente();
            cliente.setId(clienteId);
            carrito.setCliente(cliente);
            carrito.setFecha(LocalDate.now());
            return carritoRepositorio.save(carrito);
        } catch (Exception e) {
            System.err.println("Error al crear carrito: " + e.getMessage());
            return null;
        }
    }

    public Carrito obtenerCarritoPorId(Long carritoId) {
        try {
            if (carritoId == null || carritoId <= 0) return null;
            Optional<Carrito> opt = carritoRepositorio.findById(carritoId);
            return opt.orElse(null);
        } catch (Exception e) {
            System.err.println("Error al obtener carrito: " + e.getMessage());
            return null;
        }
    }

    public boolean agregarProducto(Long carritoId, Long productoId, Integer cantidad) {
        try {
            if (carritoId == null || productoId == null || cantidad == null || cantidad <= 0) return false;

            Optional<Producto> productoOpt = productoRepositorio.findById(productoId);
            if (productoOpt.isEmpty()) return false;
            Producto producto = productoOpt.get();

            Optional<CarritoProducto> existente = carritoProductoRepositorio.findByCarritoIdAndProductoId(carritoId, productoId);
            CarritoProducto cp;
            if (existente.isPresent()) {
                cp = existente.get();
                cp.setCantidad(cp.getCantidad() + cantidad);
            } else {
                cp = new CarritoProducto();
                Carrito carrito = new Carrito();
                carrito.setId(carritoId);
                cp.setCarrito(carrito);
                cp.setProducto(producto);
                cp.setCantidad(cantidad);
                cp.setPrecio((Integer) producto.getPrecio());
            }
            carritoProductoRepositorio.save(cp);
            return true;
        } catch (Exception e) {
            System.err.println("Error al agregar producto al carrito: " + e.getMessage());
            return false;
        }
    }

    public boolean actualizarCantidad(Long carritoId, Long productoId, Integer cantidad) {
        try {
            if (carritoId == null || productoId == null || cantidad == null || cantidad < 0) return false;
            Optional<CarritoProducto> opt = carritoProductoRepositorio.findByCarritoIdAndProductoId(carritoId, productoId);
            if (opt.isEmpty()) return false;
            CarritoProducto cp = opt.get();
            cp.setCantidad(cantidad);
            carritoProductoRepositorio.save(cp);
            return true;
        } catch (Exception e) {
            System.err.println("Error al actualizar cantidad en carrito: " + e.getMessage());
            return false;
        }
    }

    public boolean eliminarProducto(Long carritoId, Long productoId) {
        try {
            carritoProductoRepositorio.deleteByCarritoIdAndProductoId(carritoId, productoId);
            return true;
        } catch (Exception e) {
            System.err.println("Error al eliminar producto del carrito: " + e.getMessage());
            return false;
        }
    }

    public boolean vaciarCarrito(Long carritoId) {
        try {
            carritoProductoRepositorio.deleteByCarritoId(carritoId);
            return true;
        } catch (Exception e) {
            System.err.println("Error al vaciar carrito: " + e.getMessage());
            return false;
        }
    }

    public Integer calcularTotal(Long carritoId) {
        try {
            List<CarritoProducto> items = carritoProductoRepositorio.findByCarritoId(carritoId);
            return items.stream().mapToInt(i -> i.getPrecio() * i.getCantidad()).sum();
        } catch (Exception e) {
            System.err.println("Error al calcular total del carrito: " + e.getMessage());
            return null;
        }
    }

    public Long confirmarCarrito(Long carritoId) {
        try {
            Optional<Carrito> carritoOpt = carritoRepositorio.findById(carritoId);
            if (carritoOpt.isEmpty()) return null;
            Carrito carrito = carritoOpt.get();

            List<CarritoProducto> items = carritoProductoRepositorio.findByCarritoId(carritoId);
            if (items.isEmpty()) return null;

            Pedido pedido = new Pedido();
            pedido.setCliente(carrito.getCliente());
            pedido.setFecha(LocalDate.now());
            pedido.setEstado("PENDIENTE");
            pedido = pedidoRepositorio.save(pedido);

            int total = 0;
            for (CarritoProducto i : items) {
                PedidoProducto pp = new PedidoProducto();
                pp.setPedido(pedido);
                pp.setProducto(i.getProducto());
                pp.setCantidad(i.getCantidad());
                pp.setPrecio(i.getPrecio());
                pedidoProductoRepositorio.save(pp);
                total += i.getPrecio() * i.getCantidad();
            }

            pedido.setTotal(total);
            pedidoRepositorio.save(pedido);

            carritoProductoRepositorio.deleteByCarritoId(carritoId);
            return pedido.getId();
        } catch (Exception e) {
            System.err.println("Error al confirmar carrito: " + e.getMessage());
            return null;
        }
    }
}

