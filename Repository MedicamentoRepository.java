package com.farmacia.repository;

import com.farmacia.entity.Medicamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {
    List<Medicamento> findByActivoTrue();
    List<Medicamento> findByRequiereRecetaFalse();
    List<Medicamento> findByRequiereRecetaTrue();
    
    @Query("SELECT m FROM Medicamento m WHERE m.nombre LIKE %:nombre% AND m.activo = true")
    List<Medicamento> findByNombreContaining(String nombre);
    
    @Query("SELECT m FROM Medicamento m WHERE m.stock < :stockMin AND m.activo = true")
    List<Medicamento> findBajoStock(int stockMin);
}