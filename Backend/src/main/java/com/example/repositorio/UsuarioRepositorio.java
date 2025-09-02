package com.example.repositorio;

import org.springframework.stereotype.Repository;
import com.example.entidad.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UsuarioRepositorio extends JpaRepository<Usuario, Long> {

    // Metodo para buscar un usuario por su nombre de usuario
    Usuario findByUsuario(String usuario);

    // Metodo para verificar si un usuario existe por su nombre de usuario
    boolean existsByUsuario(String usuario);
}