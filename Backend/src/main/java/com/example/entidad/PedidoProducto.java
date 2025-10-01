package com.example.entidad;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "PedidosProductos")
@Data
public class PedidoProducto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido_producto")
    private Long id;
    
    @Column(name = "precio", nullable = false)
    private Integer precio;
    
    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;
    
    // RELACIÓN: Muchos PedidoProducto pertenecen a un Pedido
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pedido", nullable = false)
    @JsonIgnore
    private Pedido pedido;
    
    // RELACIÓN: Muchos PedidoProducto pertenecen a un Pedido
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_producto", nullable = false)
    @JsonIgnore
    private Producto producto;
    
    // MÉTODO PARA CALCULAR EL SUBTOTAL
    public Integer calcularSubtotal() {
        return precio * cantidad;
    }
}
