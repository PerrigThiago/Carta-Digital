package com.example.servicio;

import com.example.entidad.Usuario;
import com.example.repositorio.UsuarioRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServicio {
    
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    // Metodo para crear un usuario
    public Usuario crearUsuario(Usuario usuario) {
        try {
            // Validar que el usuario no este vacio
            if (usuario == null) {
                return null;
            }

            // Validar que el nombre de usuario no este vacio
            if (usuario.getUsuario()== null || usuario.getUsuario().trim().isEmpty()) {
                return null;
            }
                
            // Validar que la contraseña no este vacio
            if (usuario.getContrasenia() == null || usuario.getContrasenia().trim().isEmpty()) {
                return null;
            }

            // Verificar que no exista un usuario con el mismo nombre
            if (usuarioRepositorio.existsByUsuario(usuario.getUsuario())) {
                return null; // Usuario ya existe
            }
            return usuarioRepositorio.save(usuario);

        } catch (Exception excepcion) {
            System.err.println("Error al crear el usuario: " + excepcion.getMessage());
            return null;
        }
    } 

    // Metodo para eliminar un usuario
    public boolean eliminarUsuario(Long id) {
        try {
            if (id == null || id <= 0) {
                return false;
            }

            if (usuarioRepositorio.existsById(id)) {
                usuarioRepositorio.deleteById(id);
                return true;
        } else {
            return false;
        }

    } catch (Exception excepcion) {
        System.err.println("Error al eliminar el usuario: " + excepcion.getMessage());
        return false;
        }
    }

    public Usuario actualizarUsuario(Usuario usuario) {
        try {

            if (usuario == null || usuario.getId() == null) {  
                return null;
            }
            
            if (usuarioRepositorio.existsById(usuario.getId())) {
                return usuarioRepositorio.save(usuario);
            } else {
                return null;
            }

        } catch (Exception excepcion) {
            System.err.println("Error al actualizar el usuario: " + excepcion.getMessage());
            return null;
        }
    }

    // Metodo para obtener todos los usuarios
    public List<Usuario> obtenerUsuarios() {
        try {
            return usuarioRepositorio.findAll();

        } catch (Exception excepcion) {
            System.err.println("Error al obtener los usuarios: " + excepcion.getMessage());
            return new ArrayList<>(); // Retorna la lista vacia en caso de error
        }
    }

    // Metodo para obtener un usuario por su id
    public Optional<Usuario> obtenerUsuarioPorId(Long id) {
        try {
            if (id == null || id <= 0) {
                return Optional.empty();
            }
            return usuarioRepositorio.findById(id);

        } catch (Exception excepcion) {
            System.err.println("Error al obtener el usuario: " + excepcion.getMessage());
            return Optional.empty();
        }
    }
        // Autenticación por usuario y contraseña (simple, sin hashing)
        public Optional<Usuario> autenticar(String nombreUsuario, String contrasenia) {
            try {
                System.out.println("=== AUTENTICACIÓN INICIADA ===");
                System.out.println("Usuario recibido: '" + nombreUsuario + "'");
                System.out.println("Contraseña recibida: '" + contrasenia + "'");
                
                if (nombreUsuario == null || nombreUsuario.isBlank() || contrasenia == null || contrasenia.isBlank()) {
                    System.out.println("Credenciales vacías o nulas");
                    return Optional.empty();
                }
                
                Usuario encontrado = usuarioRepositorio.findByUsuario(nombreUsuario);
                System.out.println("Usuario encontrado en BD: " + (encontrado != null ? "SÍ" : "NO"));
                
                if (encontrado != null) {
                    System.out.println("ID del usuario: " + encontrado.getId());
                    System.out.println("Usuario en BD: '" + encontrado.getUsuario() + "'");
                    System.out.println("Contraseña en BD: '" + encontrado.getContrasenia() + "'");
                    System.out.println("¿Contraseñas coinciden? " + contrasenia.equals(encontrado.getContrasenia()));
                }
                
                if (encontrado != null && contrasenia.equals(encontrado.getContrasenia())) {
                    System.out.println("=== AUTENTICACIÓN EXITOSA ===");
                    return Optional.of(encontrado);
                }
                
                System.out.println("=== AUTENTICACIÓN FALLIDA ===");
                return Optional.empty();
            } catch (Exception e) {
                System.err.println("Error autenticando usuario: " + e.getMessage());
                e.printStackTrace();
                return Optional.empty();
            }
        }
}