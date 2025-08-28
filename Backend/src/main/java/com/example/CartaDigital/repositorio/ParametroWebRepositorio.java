package com.example.CartaDigital.repositorio;

import com.example.CartaDigital.entidad.ParametroWeb;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParametroWebRepositorio extends JpaRepository<ParametroWeb, Long> {

    Optional<ParametroWeb> findTopByOrderByIdAsc();
}


