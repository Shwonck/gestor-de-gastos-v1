package com.mss.gestor_gastos.controller;

import com.mss.gestor_gastos.model.Recebimento;
import com.mss.gestor_gastos.service.RecebimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recebimentos")
public class RecebimentoController {

    @Autowired
    private RecebimentoService recebimentoService;

    @GetMapping
    public List<Recebimento> listarTodos() {
        return recebimentoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recebimento> buscarPorId(@PathVariable Long id) {
        return recebimentoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Recebimento salvar(@RequestBody Recebimento recebimento) {
        return recebimentoService.salvar(recebimento);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Recebimento> atualizar(@PathVariable Long id, @RequestBody Recebimento recebimentoAtualizado) {
        try {
            Recebimento atualizado = recebimentoService.atualizar(id, recebimentoAtualizado);
            return ResponseEntity.ok(atualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        recebimentoService.deletar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/vazio")
    public Recebimento getRecebimentoVazio() {
        return new Recebimento();
    }
}