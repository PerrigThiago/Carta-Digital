package com.example.CartaDigital.repositorio;

import com.example.CartaDigital.entidad.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarritoRepositorio extends JpaRepository<Carrito, Long> {
    
    // Buscar carritos por cliente
    List<Carrito> findByClienteId(Long clienteId);
    
    // Buscar carritos por fecha
    List<Carrito> findByFecha(java.time.LocalDateTime fecha);
    
    // Buscar carritos activos (sin confirmar)
    List<Carrito> findByClienteIdAndFechaAfter(Long clienteId, java.time.LocalDateTime fecha);
}
