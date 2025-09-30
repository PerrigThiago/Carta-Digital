package com.example.servicio;

import com.example.entidad.Cliente;
import com.example.repositorio.ClienteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteServicio {

    @Autowired
    private ClienteRepositorio clienteRepositorio;

    // CREAR CLIENTE
    public Cliente crearCliente(Cliente cliente) {
        try {
            if (cliente == null) {
                return null;
            }

            if (cliente.getNombre() == null || cliente.getNombre().trim().isEmpty()) {
                return null;
            }

            if (cliente.getApellido() == null || cliente.getApellido().trim().isEmpty()) {
                return null;
            }

            if (cliente.getDireccion() == null || cliente.getDireccion().trim().isEmpty()) {
                return null;
            }

            if (cliente.getTelefono() == null || cliente.getTelefono().trim().isEmpty()) {
                return null;
            }

            // Evitar duplicados por teléfono si ya existe
            if (clienteRepositorio.existsByTelefono(cliente.getTelefono())) {
                return null;
            }

            return clienteRepositorio.save(cliente);

        } catch (Exception excepcion) {
            System.err.println("Error al crear el cliente: " + excepcion.getMessage());
            return null;
        }
    }

    // OBTENER TODOS LOS CLIENTES
    public List<Cliente> obtenerTodosLosClientes() {
        try {
            return clienteRepositorio.findAll();
        } catch (Exception excepcion) {
            System.err.println("Error al obtener todos los clientes: " + excepcion.getMessage());
            return List.of();
        }
    }

    // OBTENER CLIENTE POR ID
    public Optional<Cliente> obtenerClientePorId(Long id) {
        try {
            if (id == null || id <= 0) {
                return Optional.empty();
            }
            return clienteRepositorio.findById(id);
        } catch (Exception excepcion) {
            System.err.println("Error al obtener cliente por ID: " + excepcion.getMessage());
            return Optional.empty();
        }
    }

    // ACTUALIZAR CLIENTE
    public Cliente actualizarCliente(Long id, Cliente cliente) {
        try {
            if (id == null || id <= 0 || cliente == null) {
                return null;
            }

            Optional<Cliente> clienteExistenteOpt = clienteRepositorio.findById(id);
            if (clienteExistenteOpt.isEmpty()) {
                return null;
            }

            Cliente clienteExistente = clienteExistenteOpt.get();

            if (cliente.getNombre() != null && !cliente.getNombre().trim().isEmpty()) {
                clienteExistente.setNombre(cliente.getNombre());
            }

            if (cliente.getApellido() != null && !cliente.getApellido().trim().isEmpty()) {
                clienteExistente.setApellido(cliente.getApellido());
            }

            if (cliente.getDireccion() != null && !cliente.getDireccion().trim().isEmpty()) {
                clienteExistente.setDireccion(cliente.getDireccion());
            }

            if (cliente.getTelefono() != null && !cliente.getTelefono().trim().isEmpty()) {
                // Validar que el teléfono no quede duplicado con otro cliente
                if (!cliente.getTelefono().equals(clienteExistente.getTelefono())
                        && clienteRepositorio.existsByTelefono(cliente.getTelefono())) {
                    return null;
                }
                clienteExistente.setTelefono(cliente.getTelefono());
            }

            return clienteRepositorio.save(clienteExistente);

        } catch (Exception excepcion) {
            System.err.println("Error al actualizar el cliente: " + excepcion.getMessage());
            return null;
        }
    }

    // ELIMINAR CLIENTE
    public boolean eliminarCliente(Long id) {
        try {
            if (id == null || id <= 0) {
                return false;
            }

            if (clienteRepositorio.existsById(id)) {
                clienteRepositorio.deleteById(id);
                return true;
            } else {
                return false;
            }
        } catch (Exception excepcion) {
            System.err.println("Error al eliminar el cliente: " + excepcion.getMessage());
            return false;
        }
    }

    // BUSCAR POR TELÉFONO
    public Cliente buscarClientePorTelefono(String telefono) {
        try {
            if (telefono == null || telefono.trim().isEmpty()) {
                return null;
            }
            Optional<Cliente> clienteOpt = clienteRepositorio.findByTelefono(telefono);
            return clienteOpt.orElse(null);
        } catch (Exception excepcion) {
            System.err.println("Error al buscar cliente por teléfono: " + excepcion.getMessage());
            return null;
        }
    }

    // BUSCAR POR NOMBRE (contiene, ignore case)
    public List<Cliente> buscarClientePorNombre(String nombre) {
        try {
            if (nombre == null || nombre.trim().isEmpty()) {
                return List.of();
            }
            return clienteRepositorio.findByNombreContainingIgnoreCase(nombre);
        } catch (Exception excepcion) {
            System.err.println("Error al buscar clientes por nombre: " + excepcion.getMessage());
            return List.of();
        }
    }
}
