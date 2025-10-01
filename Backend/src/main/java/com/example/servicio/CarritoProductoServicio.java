package com.example.servicio;

import com.example.entidad.Carrito;
import com.example.entidad.CarritoProducto;
import com.example.entidad.Producto;
import com.example.repositorio.CarritoProductoRepositorio;
import com.example.repositorio.CarritoRepositorio;
import com.example.repositorio.ProductoRepositorio;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CarritoProductoServicio {

    @Autowired private CarritoProductoRepositorio carritoProductoRepositorio;
    @Autowired private CarritoRepositorio carritoRepositorio;
    @Autowired private ProductoRepositorio productoRepositorio;

    public List<CarritoProducto> listarPorCarrito(Long carritoId) {
        try {
            if (carritoId == null || carritoId <= 0) return List.of();
            return carritoProductoRepositorio.findByCarritoId(carritoId);
        } catch (Exception e) {
            System.err.println("Error al listar productos del carrito: " + e.getMessage());
            return List.of();
        }
    }

    public boolean agregarLinea(Long carritoId, Long productoId, Integer cantidad) {
        try {
            if (carritoId == null || productoId == null || cantidad == null || cantidad <= 0) return false;

            Optional<Carrito> carritoOpt = carritoRepositorio.findById(carritoId);
            Optional<Producto> productoOpt = productoRepositorio.findById(productoId);
            if (carritoOpt.isEmpty() || productoOpt.isEmpty()) return false;

            Optional<CarritoProducto> existente = carritoProductoRepositorio.findByCarritoIdAndProductoId(carritoId, productoId);
            CarritoProducto cp;
            if (existente.isPresent()) {
                cp = existente.get();
                cp.setCantidad(cp.getCantidad() + cantidad);
            } else {
                cp = new CarritoProducto();
                cp.setCarrito(carritoOpt.get());
                cp.setProducto(productoOpt.get());
                cp.setCantidad(cantidad);
                cp.setPrecio((Integer) productoOpt.get().getPrecio());
            }
            carritoProductoRepositorio.save(cp);
            return true;
        } catch (Exception e) {
            System.err.println("Error al agregar línea a carrito: " + e.getMessage());
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
            System.err.println("Error al actualizar cantidad de línea: " + e.getMessage());
            return false;
        }
    }

    public boolean eliminarLinea(Long carritoId, Long productoId) {
        try {
            carritoProductoRepositorio.deleteByCarritoIdAndProductoId(carritoId, productoId);
            return true;
        } catch (Exception e) {
            System.err.println("Error al eliminar línea del carrito: " + e.getMessage());
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
}


