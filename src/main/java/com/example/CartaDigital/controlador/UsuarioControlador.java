package com.example.CartaDigital.controlador;

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
import org.springframework.web.bind.annotation.RestController;

import com.example.CartaDigital.entidad.Usuario;
import com.example.CartaDigital.servicio.UsuarioServicio;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*") // Permite peticiones desde cualquier origen
public class UsuarioControlador {
    
    @Autowired
    private UsuarioServicio usuarioServicio;

    // Post - Crear usuario
    @PostMapping
    public ResponseEntity<?> crearUsuario(@RequestBody Usuario usuario) {
        Usuario usuarioCreado = usuarioServicio.crearUsuario(usuario);

        if (usuarioCreado != null) {
            return ResponseEntity.ok(usuarioCreado);
        } else {
            return ResponseEntity.badRequest().body("No se puedo encontrar el usuario");
        }
    }

    // Get - Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<List<Usuario>> obtenerUsuarios() {
        List<Usuario> usuarios = usuarioServicio.obtenerUsuarios();
        return ResponseEntity.ok(usuarios);
    }

    // Get - Obtener usuario por ID
    @GetMapping("({id})")
    public ResponseEntity<?> obtenerUsuarioPorId(@PathVariable Long id) {
        Optional<Usuario> usuario = usuarioServicio.obtenerUsuarioPorId(id);

        if (usuario.isPresent()) {
            return ResponseEntity.ok(usuario.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Put - Actualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<?> actualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuario) {
        usuario.setId(id); // Asegurar que el ID sea el correcto
        Usuario usuarioActualizado = usuarioServicio.actualizarUsuario(usuario);

        if (usuarioActualizado != null) {
            return ResponseEntity.ok(usuarioActualizado);
        } else {
            return ResponseEntity.badRequest().body("No se puedo actualizar el usuario");
        }
    }

    // DELETE - Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        boolean eliminado = usuarioServicio.eliminarUsuario(id);

        if (eliminado) {
            return ResponseEntity.ok("Usuario eliminado correctamente");
        } else {
            return ResponseEntity.badRequest().body("No se pudo eliminar el usuario");
        }
    }
}
