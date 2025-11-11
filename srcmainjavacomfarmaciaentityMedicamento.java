package com.farmacia.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "medicamentos")
public class Medicamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    @Column(nullable = false)
    private String nombre;

    @Column(columnDefinition = "TEXT")
    private String descripcion;

    @Size(max = 100)
    private String laboratorio;

    @Size(max = 100)
    @Column(name = "principio_activo")
    private String principioActivo;

    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor a 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @Min(value = 0, message = "El stock no puede ser negativo")
    @Column(nullable = false)
    private Integer stock = 0;

    @Column(name = "requiere_receta")
    private Boolean requiereReceta = false;

    private Boolean activo = true;

    @Column(name = "fecha_creacion")
    private LocalDateTime fechaCreacion;

    @OneToMany(mappedBy = "medicamento", cascade = CascadeType.ALL)
    private List<DetalleVenta> detallesVenta;

    // Constructores
    public Medicamento() {
        this.fechaCreacion = LocalDateTime.now();
    }

    public Medicamento(String nombre, String descripcion, String laboratorio, 
                     String principioActivo, BigDecimal precio, Integer stock, Boolean requiereReceta) {
        this();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.laboratorio = laboratorio;
        this.principioActivo = principioActivo;
        this.precio = precio;
        this.stock = stock;
        this.requiereReceta = requiereReceta;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getLaboratorio() { return laboratorio; }
    public void setLaboratorio(String laboratorio) { this.laboratorio = laboratorio; }

    public String getPrincipioActivo() { return principioActivo; }
    public void setPrincipioActivo(String principioActivo) { this.principioActivo = principioActivo; }

    public BigDecimal getPrecio() { return precio; }
    public void setPrecio(BigDecimal precio) { this.precio = precio; }

    public Integer getStock() { return stock; }
    public void setStock(Integer stock) { this.stock = stock; }

    public Boolean getRequiereReceta() { return requiereReceta; }
    public void setRequiereReceta(Boolean requiereReceta) { this.requiereReceta = requiereReceta; }

    public Boolean getActivo() { return activo; }
    public void setActivo(Boolean activo) { this.activo = activo; }

    public LocalDateTime getFechaCreacion() { return fechaCreacion; }
    public void setFechaCreacion(LocalDateTime fechaCreacion) { this.fechaCreacion = fechaCreacion; }

    public List<DetalleVenta> getDetallesVenta() { return detallesVenta; }
    public void setDetallesVenta(List<DetalleVenta> detallesVenta) { this.detallesVenta = detallesVenta; }
}