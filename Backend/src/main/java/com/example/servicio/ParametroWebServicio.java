package com.example.servicio;

import com.example.entidad.ParametroWeb;
import com.example.repositorio.ParametroWebRepositorio;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParametroWebServicio {

    @Autowired
    private ParametroWebRepositorio parametroWebRepositorio;

    private ParametroWeb obtenerOCrear() {
        Optional<ParametroWeb> opt = parametroWebRepositorio.findTopByOrderByIdAsc();
        return opt.orElseGet(() -> parametroWebRepositorio.save(new ParametroWeb()));
    }

    public ParametroWeb obtenerParametros() {
        try {
            return obtenerOCrear();
        } catch (Exception e) {
            System.err.println("Error al obtener parámetros web: " + e.getMessage());
            return null;
        }
    }

    public boolean activarCarta() {
        try {
            ParametroWeb pw = obtenerOCrear();
            pw.activarCarta();
            parametroWebRepositorio.save(pw);
            return true;
        } catch (Exception e) {
            System.err.println("Error al activar carta: " + e.getMessage());
            return false;
        }
    }

    public boolean suspenderCarta(String mensaje) {
        try {
            ParametroWeb pw = obtenerOCrear();
            pw.suspenderCarta(mensaje);
            parametroWebRepositorio.save(pw);
            return true;
        } catch (Exception e) {
            System.err.println("Error al suspender carta: " + e.getMessage());
            return false;
        }
    }

    public boolean actualizarMensaje(String mensaje) {
        try {
            ParametroWeb pw = obtenerOCrear();
            pw.setMensaje(mensaje);
            parametroWebRepositorio.save(pw);
            return true;
        } catch (Exception e) {
            System.err.println("Error al actualizar mensaje: " + e.getMessage());
            return false;
        }
    }

    public boolean actualizarBarrido(String barrido) {
        try {
            ParametroWeb pw = obtenerOCrear();
            pw.setBarrido(barrido);
            parametroWebRepositorio.save(pw);
            return true;
        } catch (Exception e) {
            System.err.println("Error al actualizar barrido: " + e.getMessage());
            return false;
        }
    }

    public String obtenerWhatsappNumber() {
        try {
            ParametroWeb pw = obtenerOCrear();
            return pw.getWhatsappNumber();
        } catch (Exception e) {
            System.err.println("Error al obtener whatsappNumber: " + e.getMessage());
            return null;
        }
    }

    public boolean actualizarWhatsappNumber(String number) {
        try {
            ParametroWeb pw = obtenerOCrear();
            pw.setWhatsappNumber(number);
            parametroWebRepositorio.save(pw);
            return true;
        } catch (Exception e) {
            System.err.println("Error al actualizar whatsappNumber: " + e.getMessage());
            return false;
        }
    }
}


