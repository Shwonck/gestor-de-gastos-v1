package com.mss.gestor_gastos.service;

import com.mss.gestor_gastos.model.Recebimento;
import com.mss.gestor_gastos.repository.RecebimentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecebimentoService {

    @Autowired
    private RecebimentoRepository recebimentoRepository;

    public List<Recebimento> listarTodos() {
        return recebimentoRepository.findAll();
    }

    public Optional<Recebimento> buscarPorId(Long id) {
        return recebimentoRepository.findById(id);
    }

    public Recebimento salvar(Recebimento recebimento) {
        return recebimentoRepository.save(recebimento);
    }

    public Recebimento atualizar(Long id, Recebimento recebimentoAtualizado) {
        return recebimentoRepository.findById(id).map(recebimento -> {
            recebimento.setNome(recebimentoAtualizado.getNome());
            recebimento.setDescricao(recebimentoAtualizado.getDescricao());
            recebimento.setValor(recebimentoAtualizado.getValor());
            recebimento.setDataRecebimento(recebimentoAtualizado.getDataRecebimento());
            return recebimentoRepository.save(recebimento);
        }).orElseThrow(() -> new RuntimeException("Recebimento não encontrado"));
    }

    public void deletar(Long id) {
        recebimentoRepository.deleteById(id);
    }
}