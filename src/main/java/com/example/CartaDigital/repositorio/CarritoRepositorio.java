package com.example.CartaDigital.repositorio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.CartaDigital.entidad.Carrito;

@Repository
public interface CarritoRepositorio extends JpaRepository <Carrito, Long>{
    
}
