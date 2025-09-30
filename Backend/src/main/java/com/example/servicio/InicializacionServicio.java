package com.example.servicio;

import com.example.entidad.*;
import com.example.repositorio.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
public class InicializacionServicio implements CommandLineRunner {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    
    @Autowired
    private ProductoRepositorio productoRepositorio;
    
    @Autowired
    private ClienteRepositorio clienteRepositorio;
    
    @Autowired
    private ParametroWebRepositorio parametroWebRepositorio;
    
    @Autowired
    private CarritoRepositorio carritoRepositorio;
    
    @Autowired
    private PedidoRepositorio pedidoRepositorio;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Solo ejecutar si no hay datos
        if (usuarioRepositorio.count() == 0) {
            System.out.println("Inicializando base de datos con datos de prueba...");
            cargarDatosPrueba();
            System.out.println("Base de datos inicializada correctamente.");
        }
    }

    private void cargarDatosPrueba() {
        // Crear usuario administrador
        Usuario admin = new Usuario();
        admin.setUsuario("admin");
        admin.setContrasenia("admin123");
        admin = usuarioRepositorio.save(admin);
        System.out.println("Usuario admin creado con ID: " + admin.getId());

        // Crear productos
        List<Producto> productos = Arrays.asList(
            crearProducto("Pizza Margherita", 2500, "Pizzas", "Pizza con tomate, mozzarella y albahaca", true, admin),
            crearProducto("Hamburguesa Clásica", 1800, "Hamburguesas", "Hamburguesa con lechuga, tomate y cebolla", true, admin),
            crearProducto("Ensalada César", 1200, "Ensaladas", "Ensalada con lechuga, pollo, crutones y aderezo césar", true, admin),
            crearProducto("Coca Cola 500ml", 800, "Bebidas", "Bebida gaseosa", true, admin),
            crearProducto("Agua Mineral", 500, "Bebidas", "Agua mineral sin gas", true, admin)
        );
        
        productoRepositorio.saveAll(productos);

        // Crear clientes
        List<Cliente> clientes = Arrays.asList(
            crearCliente("Juan", "Pérez", "Av. San Martín 123, CABA", "11-1234-5678"),
            crearCliente("María", "González", "Calle Corrientes 456, CABA", "11-2345-6789"),
            crearCliente("Carlos", "López", "Av. Belgrano 789, CABA", "11-3456-7890"),
            crearCliente("Ana", "Martínez", "Calle Florida 321, CABA", "11-4567-8901"),
            crearCliente("Roberto", "Fernández", "Av. Rivadavia 654, CABA", "11-5678-9012")
        );
        
        clienteRepositorio.saveAll(clientes);

        // Crear parámetros web
        ParametroWeb parametros = new ParametroWeb();
        parametros.setEstado(true);
        parametros.setMensaje("Carta disponible");
        parametros.setBarrido("¡Promo especial! 2x1 en pizzas los martes");
        parametros.setWhatsappNumber("5491122334455");
        parametroWebRepositorio.save(parametros);

        // Crear carritos de ejemplo
        Cliente cliente1 = clientes.get(0);
        Cliente cliente2 = clientes.get(1);
        Cliente cliente3 = clientes.get(2);

        Carrito carrito1 = new Carrito();
        carrito1.setFecha(LocalDate.now().minusDays(1));
        carrito1.setCliente(cliente1);
        carritoRepositorio.save(carrito1);

        Carrito carrito2 = new Carrito();
        carrito2.setFecha(LocalDate.now().minusDays(1));
        carrito2.setCliente(cliente2);
        carritoRepositorio.save(carrito2);

        Carrito carrito3 = new Carrito();
        carrito3.setFecha(LocalDate.now());
        carrito3.setCliente(cliente3);
        carritoRepositorio.save(carrito3);

        // Crear pedidos de ejemplo
        Pedido pedido1 = new Pedido();
        pedido1.setFecha(LocalDate.now().minusDays(1));
        pedido1.setEstado("ENTREGADO");
        pedido1.setTotal(7800);
        pedido1.setNotas("Sin cebolla en la pizza");
        pedido1.setCliente(cliente1);
        pedidoRepositorio.save(pedido1);

        Pedido pedido2 = new Pedido();
        pedido2.setFecha(LocalDate.now().minusDays(1));
        pedido2.setEstado("ENTREGADO");
        pedido2.setTotal(4600);
        pedido2.setNotas("Hamburguesa bien cocida");
        pedido2.setCliente(cliente2);
        pedidoRepositorio.save(pedido2);

        Pedido pedido3 = new Pedido();
        pedido3.setFecha(LocalDate.now());
        pedido3.setEstado("EN_PREPARACION");
        pedido3.setTotal(4700);
        pedido3.setNotas("Pizza extra queso");
        pedido3.setCliente(cliente3);
        pedidoRepositorio.save(pedido3);
    }

    private Producto crearProducto(String nombre, int precio, String grupo, String descripcion, boolean disponibilidad, Usuario usuario) {
        Producto producto = new Producto();
        producto.setNombre(nombre);
        producto.setPrecio(precio);
        producto.setGrupo(grupo);
        producto.setDescripcion(descripcion);
        producto.setDisponibilidad(disponibilidad);
        producto.setUsuario(usuario);
        return producto;
    }

    private Cliente crearCliente(String nombre, String apellido, String direccion, String telefono) {
        Cliente cliente = new Cliente();
        cliente.setNombre(nombre);
        cliente.setApellido(apellido);
        cliente.setDireccion(direccion);
        cliente.setTelefono(telefono);
        return cliente;
    }
}
