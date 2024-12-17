package com.mss.gestor_gastos.service;

import com.mss.gestor_gastos.model.Despesa;
import com.mss.gestor_gastos.repository.DespesaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DespesaService{

    @Autowired
    private DespesaRepository despesaRepository;

    public List<Despesa> listarTodos() {
        return despesaRepository.findAll();
    }

    public Optional<Despesa> buscarPorId(Long id) {
        return despesaRepository.findById(id);
    }

    public Despesa salvar(Despesa despesa) {
        return despesaRepository.save(despesa);
    }

    public Despesa atualizar(Long id, Despesa despesaAtualizada) {
        return despesaRepository.findById(id).map(despesa -> {
            despesa.setNome(despesaAtualizada.getNome());
            despesa.setDescricao(despesaAtualizada.getDescricao());
            despesa.setValor(despesaAtualizada.getValor());
            despesa.setData(despesaAtualizada.getData());
            return despesaRepository.save(despesa);
        }).orElseThrow(() -> new RuntimeException("Recebimento não encontrado"));
    }

    public void deletar(Long id) {
        despesaRepository.deleteById(id);
    }
}