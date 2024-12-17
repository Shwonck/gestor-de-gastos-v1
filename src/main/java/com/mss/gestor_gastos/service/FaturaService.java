package com.mss.gestor_gastos.service;

import com.mss.gestor_gastos.model.Fatura;
import com.mss.gestor_gastos.repository.FaturaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FaturaService {

    @Autowired
    private FaturaRepository faturaRepository;

    public List<Fatura> listarTodos() {
        return faturaRepository.findAll();
    }

    public Optional<Fatura> buscarPorId(Long id) {
        return faturaRepository.findById(id);
    }

    public Fatura salvar(Fatura fatura) {
        return faturaRepository.save(fatura);
    }

    public Fatura atualizar(Long id, Fatura faturaAtualizada) {
        return faturaRepository.findById(id).map(fatura -> {
            fatura.setNome(faturaAtualizada.getNome());
            fatura.setDescricao(faturaAtualizada.getDescricao());
            fatura.setValor(faturaAtualizada.getValor());
            fatura.setDataVencimento(faturaAtualizada.getDataVencimento());
            return faturaRepository.save(fatura);
        }).orElseThrow(() -> new RuntimeException("Fatura não encontrada"));
    }

    public void deletar(Long id) {
        faturaRepository.deleteById(id);
    }
}