package com.example.repositorio;

import com.example.entidad.Pedido;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoRepositorio extends JpaRepository<Pedido, Long> {

    List<Pedido> findByClienteId(Long clienteId);

    List<Pedido> findByEstado(String estado);

    List<Pedido> findByFecha(LocalDate fecha);
}


