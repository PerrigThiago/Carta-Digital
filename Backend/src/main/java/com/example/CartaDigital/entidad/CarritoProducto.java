package com.example.CartaDigital.entidad;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "CarritoProductos")
@Data
public class CarritoProducto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_carrito_producto")
    private Long id;
    
    @Column(name = "precio", nullable = false)
    private Integer precio;
    
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;
    
    // RELACIÓN: Muchos CarritoProducto pertenecen a un Carrito
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_carrito", nullable = false)
    @JsonIgnore
    private Carrito carrito;
    
    // RELACIÓN: Muchos CarritoProducto pertenecen a un Producto
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto", nullable = false)
    @JsonIgnore
    private Producto producto;
    
    // MÉTODO PARA CALCULAR EL SUBTOTAL
    public Integer calcularSubtotal() {
        return precio * cantidad;
    }
}
