package com.farmacia.repository;

import com.farmacia.entity.Venta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VentaRepository extends JpaRepository<Venta, Long> {
    List<Venta> findByFechaBetween(LocalDateTime start, LocalDateTime end);
    
    @Query("SELECT v FROM Venta v WHERE v.cliente.id = :clienteId")
    List<Venta> findByClienteId(Long clienteId);
    
    @Query("SELECT dv.medicamento.nombre, SUM(dv.cantidad) as totalVendido, SUM(dv.subtotal) as ingresos " +
           "FROM DetalleVenta dv " +
           "WHERE dv.venta.fecha BETWEEN :start AND :end " +
           "GROUP BY dv.medicamento.id, dv.medicamento.nombre " +
           "ORDER BY totalVendido DESC")
    List<Object[]> findVentasPorMedicamento(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}