package com.financeiro.casal.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("API de autenticação funcionando!");
    }
} 