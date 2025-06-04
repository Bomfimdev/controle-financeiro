package com.financeiro.casal.services;

import com.financeiro.casal.models.Conta;
import com.financeiro.casal.repositories.ContaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContaService {

    @Autowired
    private ContaRepository contaRepository;

    public List<Conta> listarContas() {
        return contaRepository.findAll();
    }

    public Conta buscarConta(String id) {
        return contaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conta não encontrada"));
    }

    public Conta criarConta(Conta conta) {
        return contaRepository.save(conta);
    }

    public Conta atualizarConta(String id, Conta conta) {
        if (!contaRepository.existsById(id)) {
            throw new RuntimeException("Conta não encontrada");
        }
        conta.setId(id);
        return contaRepository.save(conta);
    }

    public void deletarConta(String id) {
        if (!contaRepository.existsById(id)) {
            throw new RuntimeException("Conta não encontrada");
        }
        contaRepository.deleteById(id);
    }
} 