package com.financeiro.casal.controllers;

import com.financeiro.casal.models.Conta;
import com.financeiro.casal.services.ContaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/contas")
public class ContaController {

    @Autowired
    private ContaService contaService;

    @GetMapping
    public ResponseEntity<List<Conta>> listarContas() {
        List<Conta> contas = contaService.listarContas();
        return ResponseEntity.ok(contas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Conta> buscarConta(@PathVariable String id) {
        Conta conta = contaService.buscarConta(id);
        return ResponseEntity.ok(conta);
    }

    @PostMapping
    public ResponseEntity<Conta> criarConta(@Valid @RequestBody Conta conta) {
        Conta novaConta = contaService.criarConta(conta);
        return ResponseEntity.ok(novaConta);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Conta> atualizarConta(
            @PathVariable String id,
            @Valid @RequestBody Conta conta) {
        Conta contaAtualizada = contaService.atualizarConta(id, conta);
        return ResponseEntity.ok(contaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarConta(@PathVariable String id) {
        contaService.deletarConta(id);
        return ResponseEntity.noContent().build();
    }
}