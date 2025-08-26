package com.example.CartaDigital.entidad;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;

@Entity
@Table(name = "producto")
@Data
public class Producto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_producto")
    private Long id;

    @Column(name = "nombre", nullable = false, length = 255)
    private String nombre;
    
    @Column(name = "precio", nullable = false)
    private Integer precio;
    
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;
    
    @Column(name = "grupo", nullable = false, length = 50)
    private String grupo;
    
    @Column(name = "sub_grupo", length = 50)
    private String subGrupo;
    
    @Column(name = "imagen", columnDefinition = "LONGBLOB")
    private byte[] imagen;
    
    @Column(name = "descripcion", length = 255)
    private String descripcion;
    
    @Column(name = "disponibilidad", nullable = false)
    private Boolean disponibilidad = true;
    
    // RELACIÓN: Muchos productos pertenecen a un usuario
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonIgnore
    private Usuario usuario;
    
    // RELACIÓN: Un producto puede estar en muchos carritos
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<CarritoProducto> carritoProductos;
    
    // RELACIÓN: Un producto puede estar en muchos pedidos
    @OneToMany(mappedBy = "producto", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<PedidoProducto> pedidoProductos;
}
