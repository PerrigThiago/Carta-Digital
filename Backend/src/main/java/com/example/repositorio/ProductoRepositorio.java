package com.example.repositorio;

import com.example.entidad.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepositorio extends JpaRepository<Producto, Long> {

    // Métodos básicos automáticos: save(), findById(), findAll(), deleteById(), etc

    // 1. Buscar productos por grupo
    List<Producto> findByGrupo(String grupo);

    // 2. Buscar productos por disponibilidad
    List<Producto> findByDisponibilidad(Boolean disponibilidad);

    // 3. Buscar productos por rango de precios
    List<Producto> findByPrecioBetween(Integer precioMinimo, Integer precioMaximo);

    // 4. Buscar productos por nombres (contains, ignore case)
    List<Producto> findByNombreContainingIgnoreCase(String nombre);
    
    // 4.1. Buscar productos por nombre exacto (ignore case)
    List<Producto> findByNombreIgnoreCase(String nombre);

    // 5. Filtrar productos sin/bajo stock
    // Eliminado: campo 'cantidad' ya no existe

    // 6. Filtrar por precio mínimo/máximo
    List<Producto> findByPrecioGreaterThanEqual(Integer precioMinimo);

    // 7. Filtrar por precio máximo
    List<Producto> findByPrecioLessThanEqual(Integer precioMaximo);

    // 8. Buscar productos por usuario (administrador)
    List<Producto> findByUsuarioId(Long usuarioId);

    // 9. Buscar productos por grupo y disponibilidad
    List<Producto> findByGrupoAndDisponibilidad(String grupo, Boolean disponibilidad);

    // 10. Consulta personalizada para productos con stock bajo (SIN parámetros)
    // Eliminado: campo 'cantidad' ya no existe

    // 11. Consulta personalizada para productos más caros
    @Query("SELECT p FROM Producto p WHERE p.precio >= :precioMinimo ORDER BY p.precio DESC")
    List<Producto> encontrarProductosPorPrecioMinimo(@Param("precioMinimo") Integer precioMinimo);

    // 12. Consulta personalizada para productos por grupo y precio
    @Query("SELECT p FROM Producto p WHERE p.grupo = :grupo AND p.precio BETWEEN :precioMinimo AND :precioMaximo")
    List<Producto> encontrarProductosPorGrupoYRangoPrecio(
        @Param("grupo") String grupo,
        @Param("precioMinimo") Integer precioMinimo,
        @Param("precioMaximo") Integer precioMaximo
    );
}