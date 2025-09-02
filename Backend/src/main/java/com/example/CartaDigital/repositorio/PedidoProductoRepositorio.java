package com.example.CartaDigital.repositorio;

import com.example.CartaDigital.entidad.PedidoProducto;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PedidoProductoRepositorio extends JpaRepository<PedidoProducto, Long> {

    List<PedidoProducto> findByPedidoId(Long pedidoId);

    Optional<PedidoProducto> findByPedidoIdAndProductoId(Long pedidoId, Long productoId);
}


