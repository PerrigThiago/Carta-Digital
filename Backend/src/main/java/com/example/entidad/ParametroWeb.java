package com.example.entidad;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "parametro_web")
@Data
public class ParametroWeb {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "estado", nullable = false)
    private Boolean estado = true; // true = carta activa, false = carta suspendida
    
    @Column(name = "mensaje", length = 255)
    private String mensaje; // Mensaje para mostrar cuando la carta está suspendida
    
    @Column(name = "barrido", length = 255)
    private String barrido; // Mensaje de promoción o anuncio
    
    // MÉTODO PARA VERIFICAR SI LA CARTA ESTÁ ACTIVA
    public boolean isCartaActiva() {
        return estado != null && estado;
    }
    
    // MÉTODO PARA SUSPENDER LA CARTA
    public void suspenderCarta(String mensaje) {
        this.estado = false;
        this.mensaje = mensaje;
    }
    
    // MÉTODO PARA ACTIVAR LA CARTA
    public void activarCarta() {
        this.estado = true;
        this.mensaje = null;
    }
}
