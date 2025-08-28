package com.example.CartaDigital.repositorio;

import com.example.CartaDigital.entidad.CarritoProducto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarritoProductoRepositorio extends JpaRepository<CarritoProducto, Long> {

    List<CarritoProducto> findByCarritoId(Long carritoId);

    Optional<CarritoProducto> findByCarritoIdAndProductoId(Long carritoId, Long productoId);

    void deleteByCarritoId(Long carritoId);

    void deleteByCarritoIdAndProductoId(Long carritoId, Long productoId);
}


