package com.example.servicio;

import com.example.entidad.Producto;
import com.example.entidad.Usuario;
import com.example.repositorio.ProductoRepositorio;
import com.example.repositorio.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoServicio {
    
    @Autowired
    private ProductoRepositorio productoRepositorio;
    
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    
    // 1. CREAR PRODUCTO
    public Producto crearProducto(Producto producto) {
        try {
            // Validaciones que pensaste:
            if (producto == null) {
                return null;
            }
            
            if (producto.getNombre() == null || producto.getNombre().trim().isEmpty()) {
                return null;
            }
            
            if (producto.getPrecio() == null || producto.getPrecio() <= 0) {
                return null;
            }
            
            
            if (producto.getGrupo() == null || producto.getGrupo().trim().isEmpty()) {
                return null;
            }
            
            // Asignar usuario admin automáticamente si no se especifica
            if (producto.getUsuario() == null) {
                try {
                    Usuario admin = usuarioRepositorio.findByUsuario("admin");
                    if (admin != null) {
                        producto.setUsuario(admin);
                        System.out.println("Usuario admin asignado: " + admin.getId());
                    } else {
                        System.err.println("ERROR: No se encontró usuario 'admin' en la base de datos");
                        return null; // No se puede crear producto sin usuario
                    }
                } catch (Exception e) {
                    System.err.println("ERROR al buscar usuario admin: " + e.getMessage());
                    return null;
                }
            }
            
            // Lógica de negocio: disponibilidad por defecto es true
            if (producto.getDisponibilidad() == null) {
                producto.setDisponibilidad(true);
            }
            
            return productoRepositorio.save(producto);
            
        } catch (Exception excepcion) {
            System.err.println("Error al crear el producto: " + excepcion.getMessage());
            return null;
        }
    }
    
    // 2. ACTUALIZAR PRODUCTO
    public Producto actualizarProducto(Long id, Producto producto) {
        try {
            if (id == null || id <= 0 || producto == null) {
                return null;
            }
            
            // Verificar que existe antes de actualizar
            if (!productoRepositorio.existsById(id)) {
                return null;
            }
            
            // Obtener el producto existente
            Optional<Producto> productoExistente = productoRepositorio.findById(id);
            if (productoExistente.isEmpty()) {
                return null;
            }
            
            Producto productoActual = productoExistente.get();
            
            // Actualizar solo los campos permitidos (como pensaste):
            if (producto.getNombre() != null && !producto.getNombre().trim().isEmpty()) {
                productoActual.setNombre(producto.getNombre());
            }
            
            if (producto.getPrecio() != null && producto.getPrecio() > 0) {
                productoActual.setPrecio(producto.getPrecio());
            }
            
            if (producto.getDisponibilidad() != null) {
                productoActual.setDisponibilidad(producto.getDisponibilidad());
            }
            
            return productoRepositorio.save(productoActual);
            
        } catch (Exception excepcion) {
            System.err.println("Error al actualizar el producto: " + excepcion.getMessage());
            return null;
        }
    }
    
    
    // 5. MÉTODOS DE BÚSQUEDA
    public List<Producto> obtenerProductosPorGrupo(String grupo) {
        try {
            if (grupo == null || grupo.trim().isEmpty()) {
                return List.of();
            }
            return productoRepositorio.findByGrupo(grupo);
        } catch (Exception excepcion) {
            System.err.println("Error al buscar por grupo: " + excepcion.getMessage());
            return List.of();
        }
    }
    
    public List<Producto> obtenerProductosDisponibles() {
        try {
            return productoRepositorio.findByDisponibilidad(true);
        } catch (Exception excepcion) {
            System.err.println("Error al obtener productos disponibles: " + excepcion.getMessage());
            return List.of();
        }
    }
    
    public List<Producto> obtenerProductosPorRangoPrecio(Integer precioMinimo, Integer precioMaximo) {
        try {
            if (precioMinimo == null || precioMaximo == null || precioMinimo < 0 || precioMaximo < precioMinimo) {
                return List.of();
            }
            return productoRepositorio.findByPrecioBetween(precioMinimo, precioMaximo);
        } catch (Exception excepcion) {
            System.err.println("Error al buscar por rango de precio: " + excepcion.getMessage());
            return List.of();
        }
    }
    
    public List<Producto> buscarProductosPorNombre(String nombre) {
        try {
            if (nombre == null || nombre.trim().isEmpty()) {
                return List.of();
            }
            return productoRepositorio.findByNombreContainingIgnoreCase(nombre);
        } catch (Exception excepcion) {
            System.err.println("Error al buscar por nombre: " + excepcion.getMessage());
            return List.of();
        }
    }
    
    
    // 6. MÉTODOS CRUD BÁSICOS
    public List<Producto> obtenerTodosLosProductos() {
        try {
            return productoRepositorio.findAll();
        } catch (Exception excepcion) {
            System.err.println("Error al obtener todos los productos: " + excepcion.getMessage());
            return List.of();
        }
    }
    
    public Optional<Producto> obtenerProductoPorId(Long id) {
        try {
            if (id == null || id <= 0) {
                return Optional.empty();
            }
            return productoRepositorio.findById(id);
        } catch (Exception excepcion) {
            System.err.println("Error al obtener producto por ID: " + excepcion.getMessage());
            return Optional.empty();
        }
    }
    
    public boolean eliminarProducto(Long id) {
        try {
            if (id == null || id <= 0) {
                return false;
            }
            
            if (productoRepositorio.existsById(id)) {
                productoRepositorio.deleteById(id);
                return true;
            } else {
                return false;
            }
        } catch (Exception excepcion) {
            System.err.println("Error al eliminar producto: " + excepcion.getMessage());
            return false;
        }
    }
}