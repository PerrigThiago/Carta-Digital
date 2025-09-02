package com.example.CartaDigital.controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.CartaDigital.entidad.Cliente;
import com.example.CartaDigital.servicio.ClienteServicio;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins =  "*")
public class ClienteControlador {
    
    @Autowired
    private ClienteServicio clienteServicio;

    // ENDPOINTS CRUD BASICOS

    // POST - Crear cliente
    @PostMapping
    public ResponseEntity<?> crearCliente(@RequestBody Cliente cliente) {
        Cliente clienteCreado = clienteServicio.crearCliente(cliente);

        if (clienteCreado != null) {
            return ResponseEntity.ok(clienteCreado);
        } else {
            return ResponseEntity.badRequest().body("No se puedo crear el cliente");
        }
    }

    // GET - Obtener todos los clientes
    @GetMapping
    public ResponseEntity<List<Cliente>> obtenerTodosLosClientes() {
        List<Cliente> clientes = clienteServicio.obtenerTodosLosClientes();
        return ResponseEntity.ok(clientes);
    }

    // GET - Obtener cliente por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> obtenerClientePorId(@PathVariable Long id) {
        Optional<Cliente> cliente = clienteServicio.obtenerClientePorId(id);

        if (cliente.isPresent()) {
            return ResponseEntity.ok(cliente.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // PUT - Actualizar cliente
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarCliente(@PathVariable Long id, @RequestBody Cliente cliente) {
        cliente.setId(id);
        Cliente clienteActualizado = clienteServicio.actualizarCliente(id, cliente);

        if (clienteActualizado != null) {
            return ResponseEntity.ok(clienteActualizado);
        } else {
            return ResponseEntity.badRequest().body("No se puedo actualizar el cliente");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarCliente(@PathVariable Long id) {
        boolean eliminado = clienteServicio.eliminarCliente(id);

        if (eliminado) {
            return ResponseEntity.ok("Cliente eliminado correctamente");
        } else {
            return ResponseEntity.badRequest().body("No se puedo eliminar el cliente");
        }
    }

    // ENDPOINTS PERSONALIZADOS

    // GET - Buscar cliente por telefono
    @GetMapping("/buscar")
    public ResponseEntity<?> buscarClientePorTelefono(@RequestParam String telefono) {
        Cliente cliente = clienteServicio.buscarClientePorTelefono(telefono);

        if (cliente != null) {
            return ResponseEntity.ok(cliente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get - Cliente por nombre
    @GetMapping("/nombre")
    public ResponseEntity <List<Cliente>> buscarClientePorNombre(@RequestParam String nombre) {
        List<Cliente> clientes = clienteServicio.buscarClientePorNombre(nombre);
        return ResponseEntity.ok(clientes);
    }
}
