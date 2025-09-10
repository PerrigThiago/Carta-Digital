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
            System.out.println("=== CREAR PRODUCTO ===");
            System.out.println("Producto recibido: " + producto);
            System.out.println("Usuario recibido: " + (producto != null ? producto.getUsuario() : "null"));
            
            // Validaciones que pensaste:
            if (producto == null) {
                System.err.println("ERROR: Producto es null");
                return null;
            }
            
            if (producto.getNombre() == null || producto.getNombre().trim().isEmpty()) {
                System.err.println("ERROR: Nombre es null o vacío");
                return null;
            }
            
            if (producto.getPrecio() == null || producto.getPrecio() <= 0) {
                System.err.println("ERROR: Precio es null o <= 0: " + producto.getPrecio());
                return null;
            }
            
            if (producto.getGrupo() == null || producto.getGrupo().trim().isEmpty()) {
                System.err.println("ERROR: Grupo es null o vacío");
                return null;
            }
            
            // Validar que no exista otro producto con el mismo nombre
            List<Producto> productosConMismoNombre = productoRepositorio.findByNombreIgnoreCase(producto.getNombre().trim());
            if (!productosConMismoNombre.isEmpty()) {
                System.err.println("ERROR: Ya existe un producto con el nombre: " + producto.getNombre());
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
            
            Producto productoGuardado = productoRepositorio.save(producto);
            System.out.println("Producto guardado exitosamente: " + productoGuardado.getId());
            return productoGuardado;
            
        } catch (Exception excepcion) {
            System.err.println("Error al crear el producto: " + excepcion.getMessage());
            excepcion.printStackTrace();
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
                // Validar que no exista otro producto con el mismo nombre (excluyendo el actual)
                List<Producto> productosConMismoNombre = productoRepositorio.findByNombreIgnoreCase(producto.getNombre().trim());
                boolean nombreDuplicado = productosConMismoNombre.stream()
                    .anyMatch(p -> !p.getId().equals(id));
                
                if (nombreDuplicado) {
                    System.err.println("ERROR: Ya existe otro producto con el nombre: " + producto.getNombre());
                    return null;
                }
                
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
    
    // Eliminar todos los productos de una categoría
    public boolean eliminarProductosPorCategoria(String categoria) {
        try {
            if (categoria == null || categoria.trim().isEmpty()) {
                System.err.println("ERROR: Categoría es null o vacía");
                return false;
            }
            
            System.out.println("=== ELIMINAR CATEGORÍA ===");
            System.out.println("Categoría a eliminar: " + categoria);
            
            // Buscar productos de la categoría
            List<Producto> productosEnCategoria = productoRepositorio.findByGrupo(categoria);
            System.out.println("Productos encontrados en categoría: " + productosEnCategoria.size());
            
            if (productosEnCategoria.isEmpty()) {
                System.out.println("No hay productos en esta categoría");
                return true; // No hay nada que eliminar, consideramos éxito
            }
            
            // Eliminar todos los productos de la categoría
            for (Producto producto : productosEnCategoria) {
                System.out.println("Eliminando producto: " + producto.getId() + " - " + producto.getNombre());
                productoRepositorio.deleteById(producto.getId());
            }
            
            System.out.println("Categoría eliminada exitosamente. Productos eliminados: " + productosEnCategoria.size());
            return true;
            
        } catch (Exception excepcion) {
            System.err.println("Error al eliminar categoría: " + excepcion.getMessage());
            excepcion.printStackTrace();
            return false;
        }
    }
}