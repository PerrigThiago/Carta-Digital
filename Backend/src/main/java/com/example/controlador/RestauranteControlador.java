package com.example.controlador;

import com.example.entidad.Restaurante;
import com.example.servicio.RestauranteServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/restaurante")
@CrossOrigin(origins = "*")
public class RestauranteControlador {
    
    @Autowired
    private RestauranteServicio restauranteServicio;
    
    /**
     * Obtiene toda la información del restaurante
     */
    @GetMapping("/info")
    public ResponseEntity<Restaurante> obtenerInformacion() {
        try {
            Restaurante restaurante = restauranteServicio.obtenerOCrear();
            return ResponseEntity.ok(restaurante);
        } catch (Exception e) {
            System.err.println("Error al obtener información del restaurante: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Actualiza toda la información del restaurante
     */
    @PutMapping("/info")
    public ResponseEntity<?> actualizarInformacion(@RequestBody Restaurante restaurante) {
        try {
            // Validaciones básicas
            if (restaurante.getNombreRestaurante() == null || restaurante.getNombreRestaurante().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("El nombre del restaurante es obligatorio");
            }
            if (restaurante.getDireccion() == null || restaurante.getDireccion().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("La dirección es obligatoria");
            }
            if (restaurante.getInstagram() == null || restaurante.getInstagram().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("El Instagram es obligatorio");
            }
            if (restaurante.getHorarioApertura() == null || restaurante.getHorarioApertura().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("El horario de apertura es obligatorio");
            }
            if (restaurante.getHorarioCierre() == null || restaurante.getHorarioCierre().trim().isEmpty()) {
                return ResponseEntity.badRequest().body("El horario de cierre es obligatorio");
            }
            
            Restaurante restauranteActualizado = restauranteServicio.actualizarRestaurante(restaurante);
            return ResponseEntity.ok(restauranteActualizado);
        } catch (Exception e) {
            System.err.println("Error al actualizar información del restaurante: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Error al actualizar la información del restaurante");
        }
    }
    
    /**
     * Obtiene solo el nombre del restaurante
     */
    @GetMapping("/nombre")
    public ResponseEntity<String> obtenerNombre() {
        try {
            String nombre = restauranteServicio.obtenerNombreRestaurante();
            return ResponseEntity.ok(nombre);
        } catch (Exception e) {
            System.err.println("Error al obtener nombre del restaurante: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Obtiene solo la dirección del restaurante
     */
    @GetMapping("/direccion")
    public ResponseEntity<String> obtenerDireccion() {
        try {
            String direccion = restauranteServicio.obtenerDireccion();
            return ResponseEntity.ok(direccion);
        } catch (Exception e) {
            System.err.println("Error al obtener dirección del restaurante: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Obtiene solo el Instagram del restaurante
     */
    @GetMapping("/instagram")
    public ResponseEntity<String> obtenerInstagram() {
        try {
            String instagram = restauranteServicio.obtenerInstagram();
            return ResponseEntity.ok(instagram);
        } catch (Exception e) {
            System.err.println("Error al obtener Instagram del restaurante: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    
    /**
     * Obtiene los horarios del restaurante
     */
    @GetMapping("/horarios")
    public ResponseEntity<Map<String, String>> obtenerHorarios() {
        try {
            Map<String, String> horarios = new HashMap<>();
            horarios.put("apertura", restauranteServicio.obtenerHorarioApertura());
            horarios.put("cierre", restauranteServicio.obtenerHorarioCierre());
            return ResponseEntity.ok(horarios);
        } catch (Exception e) {
            System.err.println("Error al obtener horarios del restaurante: " + e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}
