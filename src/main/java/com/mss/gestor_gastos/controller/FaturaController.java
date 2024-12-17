package com.mss.gestor_gastos.controller;

import com.mss.gestor_gastos.model.Fatura;
import com.mss.gestor_gastos.service.FaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faturas")
public class FaturaController {

    @Autowired
    private FaturaService faturaService;

    @GetMapping
    public List<Fatura> listarTodos() {
        return faturaService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fatura> buscarPorId(@PathVariable Long id) {
        return faturaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Fatura salvar(@RequestBody Fatura fatura) {
        return faturaService.salvar(fatura);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Fatura> atualizar(@PathVariable Long id, @RequestBody Fatura faturaAtualizada) {
        try {
            Fatura atualizada = faturaService.atualizar(id, faturaAtualizada);
            return ResponseEntity.ok(atualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        faturaService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/vazio")
    public Fatura getFaturaVazio() {
        return new Fatura();
    }
}
