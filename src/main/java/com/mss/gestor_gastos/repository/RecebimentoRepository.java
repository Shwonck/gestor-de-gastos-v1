package com.mss.gestor_gastos.repository;

import com.mss.gestor_gastos.model.Recebimento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecebimentoRepository extends JpaRepository<Recebimento, Long> {
}