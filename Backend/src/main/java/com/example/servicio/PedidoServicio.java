package com.example.servicio;

import com.example.entidad.Pedido;
import com.example.repositorio.PedidoRepositorio;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PedidoServicio {

    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    public List<Pedido> obtenerTodosLosPedidos() {
        try {
            return pedidoRepositorio.findAll();
        } catch (Exception e) {
            System.err.println("Error al obtener todos los pedidos: " + e.getMessage());
            return List.of();
        }
    }

    public Optional<Pedido> obtenerPedidoPorId(Long id) {
        try {
            if (id == null || id <= 0) {
                return Optional.empty();
            }
            return pedidoRepositorio.findById(id);
        } catch (Exception e) {
            System.err.println("Error al obtener pedido por ID: " + e.getMessage());
            return Optional.empty();
        }
    }

    public List<Pedido> obtenerPedidosPorCliente(Long clienteId) {
        try {
            if (clienteId == null || clienteId <= 0) {
                return List.of();
            }
            return pedidoRepositorio.findByClienteId(clienteId);
        } catch (Exception e) {
            System.err.println("Error al obtener pedidos por cliente: " + e.getMessage());
            return List.of();
        }
    }

    public List<Pedido> obtenerPedidosPorEstado(String estado) {
        try {
            if (estado == null || estado.trim().isEmpty()) {
                return List.of();
            }
            return pedidoRepositorio.findByEstado(estado);
        } catch (Exception e) {
            System.err.println("Error al obtener pedidos por estado: " + e.getMessage());
            return List.of();
        }
    }

    public boolean actualizarEstado(Long id, String nuevoEstado) {
        try {
            if (id == null || id <= 0 || nuevoEstado == null || nuevoEstado.trim().isEmpty()) {
                return false;
            }
            Optional<Pedido> pedidoOpt = pedidoRepositorio.findById(id);
            if (pedidoOpt.isEmpty()) {
                return false;
            }
            Pedido pedido = pedidoOpt.get();
            pedido.setEstado(nuevoEstado);
            pedidoRepositorio.save(pedido);
            return true;
        } catch (Exception e) {
            System.err.println("Error al actualizar estado del pedido: " + e.getMessage());
            return false;
        }
    }

    public List<Pedido> obtenerPedidosDelDia() {
        try {
            return pedidoRepositorio.findByFecha(LocalDate.now());
        } catch (Exception e) {
            System.err.println("Error al obtener pedidos del día: " + e.getMessage());
            return List.of();
        }
    }

    public List<Pedido> obtenerPedidosPorFecha(String fechaIso) {
        try {
            LocalDate fecha = LocalDate.parse(fechaIso);
            return pedidoRepositorio.findByFecha(fecha);
        } catch (Exception e) {
            System.err.println("Error al obtener pedidos por fecha: " + e.getMessage());
            return List.of();
        }
    }

    public boolean enviarPedidoWhatsApp(Long id) {
        return false;
    }
}