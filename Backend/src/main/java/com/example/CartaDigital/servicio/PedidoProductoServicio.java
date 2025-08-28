package com.example.CartaDigital.servicio;

import com.example.CartaDigital.entidad.PedidoProducto;
import com.example.CartaDigital.repositorio.PedidoProductoRepositorio;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoProductoServicio {

    @Autowired private PedidoProductoRepositorio pedidoProductoRepositorio;

    public List<PedidoProducto> listarPorPedido(Long pedidoId) {
        try {
            if (pedidoId == null || pedidoId <= 0) return List.of();
            return pedidoProductoRepositorio.findByPedidoId(pedidoId);
        } catch (Exception e) {
            System.err.println("Error al listar productos del pedido: " + e.getMessage());
            return List.of();
        }
    }

    public Optional<PedidoProducto> obtenerPorPedidoYProducto(Long pedidoId, Long productoId) {
        try {
            if (pedidoId == null || pedidoId <= 0 || productoId == null || productoId <= 0) {
                return Optional.empty();
            }
            return pedidoProductoRepositorio.findByPedidoIdAndProductoId(pedidoId, productoId);
        } catch (Exception e) {
            System.err.println("Error al obtener línea de pedido: " + e.getMessage());
            return Optional.empty();
        }
    }
}


