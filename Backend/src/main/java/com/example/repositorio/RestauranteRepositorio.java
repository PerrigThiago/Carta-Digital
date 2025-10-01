package com.example.repositorio;

import com.example.entidad.Restaurante;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RestauranteRepositorio extends JpaRepository<Restaurante, Long> {
    
    // Método para encontrar el primer restaurante (asumimos que solo hay uno)
    Restaurante findFirstByOrderByIdAsc();
    
    // Método para verificar si existe algún restaurante
    boolean existsByIdIsNotNull();
}
