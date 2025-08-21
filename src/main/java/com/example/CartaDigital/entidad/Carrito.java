package com.example.CartaDigital.entidad;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "carrito")
@Data
public class Carrito {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_carrito")
    private Long id;
    
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;
    
    // RELACIÓN: Muchos carritos pertenecen a un cliente
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente", nullable = false)
    @JsonIgnore
    private Cliente cliente;
    
    // RELACIÓN: Un carrito puede tener muchos productos
    @OneToMany(mappedBy = "carrito", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<CarritoProducto> carritoProductos;
    
    // MÉTODO PARA CALCULAR EL TOTAL DEL CARRITO
    public Integer calcularTotal() {
        if (carritoProductos == null) return 0;
        return carritoProductos.stream()
                .mapToInt(cp -> cp.getPrecio() * cp.getCantidad())
                .sum();
    }
    
    // MÉTODO PARA OBTENER LA CANTIDAD TOTAL DE PRODUCTOS
    public Integer obtenerCantidadTotal() {
        if (carritoProductos == null) return 0;
        return carritoProductos.stream()
                .mapToInt(CarritoProducto::getCantidad)
                .sum();
    }
}
