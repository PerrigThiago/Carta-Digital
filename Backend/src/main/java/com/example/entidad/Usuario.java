package com.example.entidad;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
@Table(name = "usuario")
@Data
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id;

    @Column(name = "usuario", nullable = false, length = 50)
    private String usuario;
    
    @Column(name = "contrasenia", nullable = false, length = 50)
    private String contrasenia;
    
    // RELACIÓN: Un usuario puede tener muchos productos
    @OneToMany(mappedBy = "usuario", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Producto> productos;
}
