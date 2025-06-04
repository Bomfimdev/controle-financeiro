package com.financeiro.casal.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transacoes")
public class Transacao {
    
    @Id
    private String id;
    
    @NotBlank
    private String descricao;
    
    @NotNull
    @Positive
    private BigDecimal valor;
    
    @NotNull
    @PastOrPresent
    private LocalDate data;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    private TipoTransacao tipo;
    
    @NotNull
    private String categoria;
    
    @ManyToOne
    @JoinColumn(name = "conta_id", nullable = false)
    private Conta conta;
    
    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
    
    private LocalDateTime dataCriacao;
    
    private LocalDateTime ultimaAtualizacao;
    
    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = UUID.randomUUID().toString();
        }
        dataCriacao = LocalDateTime.now();
        ultimaAtualizacao = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        ultimaAtualizacao = LocalDateTime.now();
    }
}