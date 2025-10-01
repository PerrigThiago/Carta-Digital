package com.example.servicio;

import com.example.entidad.Restaurante;
import com.example.repositorio.RestauranteRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RestauranteServicio {
    
    @Autowired
    private RestauranteRepositorio restauranteRepositorio;
    
    /**
     * Obtiene la información del restaurante
     * Si no existe, crea uno con datos por defecto
     */
    public Restaurante obtenerOCrear() {
        Optional<Restaurante> restauranteOpt = Optional.ofNullable(restauranteRepositorio.findFirstByOrderByIdAsc());
        
        if (restauranteOpt.isPresent()) {
            return restauranteOpt.get();
        } else {
            // Crear restaurante por defecto si no existe
            Restaurante restaurante = new Restaurante(
                "FrontRoti Pizza",
                "Calle Principal 123, Ciudad",
                "@frontroti_pizza",
                "09:00",
                "22:00"
            );
            return restauranteRepositorio.save(restaurante);
        }
    }
    
    /**
     * Actualiza la información del restaurante
     */
    public Restaurante actualizarRestaurante(Restaurante restauranteActualizado) {
        Restaurante restaurante = obtenerOCrear();
        
        restaurante.setNombreRestaurante(restauranteActualizado.getNombreRestaurante());
        restaurante.setDireccion(restauranteActualizado.getDireccion());
        restaurante.setInstagram(restauranteActualizado.getInstagram());
        restaurante.setHorarioApertura(restauranteActualizado.getHorarioApertura());
        restaurante.setHorarioCierre(restauranteActualizado.getHorarioCierre());
        
        return restauranteRepositorio.save(restaurante);
    }
    
    /**
     * Obtiene solo el nombre del restaurante
     */
    public String obtenerNombreRestaurante() {
        return obtenerOCrear().getNombreRestaurante();
    }
    
    /**
     * Obtiene solo la dirección del restaurante
     */
    public String obtenerDireccion() {
        return obtenerOCrear().getDireccion();
    }
    
    /**
     * Obtiene solo el Instagram del restaurante
     */
    public String obtenerInstagram() {
        return obtenerOCrear().getInstagram();
    }
    
    /**
     * Obtiene solo el horario de apertura
     */
    public String obtenerHorarioApertura() {
        return obtenerOCrear().getHorarioApertura();
    }
    
    /**
     * Obtiene solo el horario de cierre
     */
    public String obtenerHorarioCierre() {
        return obtenerOCrear().getHorarioCierre();
    }
}
