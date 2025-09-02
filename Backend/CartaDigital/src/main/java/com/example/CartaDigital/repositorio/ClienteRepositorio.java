package com.example.CartaDigital.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.CartaDigital.entidad.Cliente;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepositorio extends JpaRepository<Cliente, Long>{

    Optional<Cliente> findByTelefono(String telefono);

    boolean existsByTelefono(String telefono);

    List<Cliente> findByNombreContainingIgnoreCase(String nombre);
}