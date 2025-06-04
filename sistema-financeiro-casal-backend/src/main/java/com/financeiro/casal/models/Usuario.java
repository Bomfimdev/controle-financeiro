package com.financeiro.casal.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuarios")
public class Usuario {
    
    @Id
    private String id;
    
    @NotBlank
    @Size(max = 50)
    private String nome;
    
    @NotBlank
    @Size(max = 100)
    private String sobrenome;
    
    @NotBlank
    @Size(max = 100)
    @Email
    @Column(unique = true)
    private String email;
    
    @JsonIgnore
    private String senha;
    
    private String avatarUrl;
    
    private LocalDateTime dataCriacao;
    
    private LocalDateTime ultimaAtualizacao;
    
    @JsonIgnore
    @OneToMany(mappedBy = "usuario")
    private Set<Conta> contas = new HashSet<>();
    
    @JsonIgnore
    @OneToMany(mappedBy = "usuario")
    private Set<Transacao> transacoes = new HashSet<>();
    
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
    
    public String getNomeCompleto() {
        return nome + " " + sobrenome;
    }
}