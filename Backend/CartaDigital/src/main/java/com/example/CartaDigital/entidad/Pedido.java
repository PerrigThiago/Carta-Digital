package com.example.CartaDigital.entidad;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "Pedidos")
@Data
public class Pedido {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Long id;
    
    @Column(name = "fecha", nullable = false)
    private LocalDate fecha;
    
    @Column(name = "estado", nullable = false, length = 50)
    private String estado = "PENDIENTE"; // PENDIENTE, CONFIRMADO, EN_PREPARACION, LISTO, ENTREGADO
    
    @Column(name = "total", nullable = false)
    private Integer total = 0;
    
    @Column(name = "notas", length = 500)
    private String notas;
    
    // RELACIÓN: Muchos pedidos pertenecen a un cliente
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cliente", nullable = false)
    @JsonIgnore
    private Cliente cliente;
    
    // RELACIÓN: Un pedido puede tener muchos productos
    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<PedidoProducto> pedidoProductos;
    
    // MÉTODO PARA CALCULAR EL TOTAL DEL PEDIDO
    public void calcularTotal() {
        if (pedidoProductos == null) {
            this.total = 0;
            return;
        }
        this.total = pedidoProductos.stream()
                .mapToInt(pp -> pp.getPrecio() * pp.getCantidad())
                .sum();
    }
    
    // MÉTODO PARA OBTENER LA CANTIDAD TOTAL DE PRODUCTOS
    public Integer obtenerCantidadTotal() {
        if (pedidoProductos == null) return 0;
        return pedidoProductos.stream()
                .mapToInt(PedidoProducto::getCantidad)
                .sum();
    }
}
