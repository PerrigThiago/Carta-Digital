package com.example.controlador;

import com.example.entidad.ParametroWeb;
import com.example.servicio.ParametroWebServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/parametros")
@CrossOrigin(origins = "*")
public class ParametroWebControlador {

    @Autowired private ParametroWebServicio parametroWebServicio;

    @GetMapping("/estado")
    public ResponseEntity<?> obtenerEstado() {
        ParametroWeb pw = parametroWebServicio.obtenerParametros();
        return pw != null ? ResponseEntity.ok(pw) : ResponseEntity.notFound().build();
    }

    @PutMapping("/activar")
    public ResponseEntity<?> activar() {
        return parametroWebServicio.activarCarta() ? ResponseEntity.ok("Carta activada")
                : ResponseEntity.badRequest().body("No se pudo activar la carta");
    }

    @PutMapping("/suspender")
    public ResponseEntity<?> suspender(@RequestParam String mensaje) {
        return parametroWebServicio.suspenderCarta(mensaje) ? ResponseEntity.ok("Carta suspendida")
                : ResponseEntity.badRequest().body("No se pudo suspender la carta");
    }

    @PutMapping("/mensaje")
    public ResponseEntity<?> actualizarMensaje(@RequestParam String mensaje) {
        return parametroWebServicio.actualizarMensaje(mensaje) ? ResponseEntity.ok("Mensaje actualizado")
                : ResponseEntity.badRequest().body("No se pudo actualizar el mensaje");
    }

    @PutMapping("/barrido")
    public ResponseEntity<?> actualizarBarrido(@RequestParam String barrido) {
        return parametroWebServicio.actualizarBarrido(barrido) ? ResponseEntity.ok("Barrido actualizado")
                : ResponseEntity.badRequest().body("No se pudo actualizar el barrido");
    }

    // WhatsApp Number
    @GetMapping("/whatsapp-number")
    public ResponseEntity<?> obtenerWhatsappNumber() {
        String value = parametroWebServicio.obtenerWhatsappNumber();
        return ResponseEntity.ok(value);
    }

    @PutMapping("/whatsapp-number")
    public ResponseEntity<?> actualizarWhatsappNumber(@RequestParam String number) {
        if (number == null || number.isBlank()) {
            return ResponseEntity.badRequest().body("El número de WhatsApp es obligatorio");
        }
        String normalized = number.trim();
        if (!normalized.matches("\\d+")) {
            return ResponseEntity.badRequest().body("El número de WhatsApp debe contener solo dígitos");
        }
        boolean ok = parametroWebServicio.actualizarWhatsappNumber(normalized);
        return ok ? ResponseEntity.ok("WhatsApp actualizado") : ResponseEntity.badRequest().body("No se pudo actualizar WhatsApp");
    }
}


