import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  template: `
    <div class="register-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Registro</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Nome</mat-label>
              <input matInput formControlName="nome" placeholder="Digite seu nome">
              <mat-error *ngIf="registerForm.get('nome')?.hasError('required')">
                Nome é obrigatório
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Sobrenome</mat-label>
              <input matInput formControlName="sobrenome" placeholder="Digite seu sobrenome">
              <mat-error *ngIf="registerForm.get('sobrenome')?.hasError('required')">
                Sobrenome é obrigatório
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="Digite seu email">
              <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
                Email é obrigatório
              </mat-error>
              <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
                Email inválido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Senha</mat-label>
              <input matInput formControlName="senha" type="password" placeholder="Digite sua senha">
              <mat-error *ngIf="registerForm.get('senha')?.hasError('required')">
                Senha é obrigatória
              </mat-error>
              <mat-error *ngIf="registerForm.get('senha')?.hasError('minlength')">
                Senha deve ter no mínimo 6 caracteres
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="registerForm.invalid">
              Registrar
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <p class="login-link">
            Já tem uma conta? <a routerLink="/login">Faça login</a>
          </p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5f5f5;
    }

    mat-card {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .login-link {
      text-align: center;
      margin-top: 1rem;
    }

    .login-link a {
      color: #1976d2;
      text-decoration: none;
    }

    .login-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.registrar(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (erro) => {
          console.error('Erro no registro:', erro);
        }
      });
    }
  }
} 