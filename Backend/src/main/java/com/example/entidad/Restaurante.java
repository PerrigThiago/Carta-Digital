package com.example.entidad;

import jakarta.persistence.*;

@Entity
@Table(name = "restaurantes")
public class Restaurante {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "nombre_restaurante", nullable = false, length = 255)
    private String nombreRestaurante;
    
    @Column(name = "direccion", nullable = false, length = 500)
    private String direccion;
    
    @Column(name = "instagram", nullable = false, length = 100)
    private String instagram;
    
    @Column(name = "horario_apertura", nullable = false, length = 10)
    private String horarioApertura;
    
    @Column(name = "horario_cierre", nullable = false, length = 10)
    private String horarioCierre;
    
    // Constructor por defecto
    public Restaurante() {}
    
    // Constructor con parámetros
    public Restaurante(String nombreRestaurante, String direccion, String instagram, 
                      String horarioApertura, String horarioCierre) {
        this.nombreRestaurante = nombreRestaurante;
        this.direccion = direccion;
        this.instagram = instagram;
        this.horarioApertura = horarioApertura;
        this.horarioCierre = horarioCierre;
    }
    
    // Getters y Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getNombreRestaurante() {
        return nombreRestaurante;
    }
    
    public void setNombreRestaurante(String nombreRestaurante) {
        this.nombreRestaurante = nombreRestaurante;
    }
    
    public String getDireccion() {
        return direccion;
    }
    
    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
    
    public String getInstagram() {
        return instagram;
    }
    
    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }
    
    public String getHorarioApertura() {
        return horarioApertura;
    }
    
    public void setHorarioApertura(String horarioApertura) {
        this.horarioApertura = horarioApertura;
    }
    
    public String getHorarioCierre() {
        return horarioCierre;
    }
    
    public void setHorarioCierre(String horarioCierre) {
        this.horarioCierre = horarioCierre;
    }
    
    @Override
    public String toString() {
        return "Restaurante{" +
                "id=" + id +
                ", nombreRestaurante='" + nombreRestaurante + '\'' +
                ", direccion='" + direccion + '\'' +
                ", instagram='" + instagram + '\'' +
                ", horarioApertura='" + horarioApertura + '\'' +
                ", horarioCierre='" + horarioCierre + '\'' +
                '}';
    }
}
