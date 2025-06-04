import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from, throwError, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { DadosAutenticacao, DadosRegistro, Usuario } from '../models/usuario.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private autenticado = new BehaviorSubject<boolean>(false);

  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.verificarAutenticacao();
  }

  private verificarAutenticacao() {
    from(this.supabaseService.getSession()).subscribe({
      next: (response) => {
        this.autenticado.next(!!response.data.session);
      },
      error: () => {
        this.autenticado.next(false);
      }
    });
  }

  /**
   * Realiza o login do usuário
   * @param credentials Dados de autenticação (email e senha)
   * @returns Observable com o usuário logado
   */
  login(credentials: { email: string; senha: string }): Observable<any> {
    return from(this.supabaseService.signIn(credentials.email, credentials.senha)).pipe(
      map(response => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.autenticado.next(true);
        return response.data;
      }),
      catchError(error => {
        this.snackBar.open(error.message || 'Erro ao fazer login', 'Fechar', {
          duration: 3000
        });
        throw error;
      })
    );
  }

  /**
   * Registra um novo usuário
   * @param dados Dados de registro (email, senha, nome, sobrenome)
   * @returns Observable com o usuário registrado
   */
  registrar(userData: { nome: string; sobrenome: string; email: string; senha: string }): Observable<any> {
    return from(this.supabaseService.signUp(userData.email, userData.senha)).pipe(
      map(response => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        // Atualizar o perfil do usuário com nome e sobrenome
        return this.updateUserProfile(userData.nome, userData.sobrenome);
      }),
      catchError(error => {
        this.snackBar.open(error.message || 'Erro ao criar conta', 'Fechar', {
          duration: 3000
        });
        throw error;
      })
    );
  }

  private updateUserProfile(nome: string, sobrenome: string): Observable<any> {
    return from(this.supabaseService.updateUserProfile({ nome, sobrenome })).pipe(
      map(response => {
        if (response.error) {
          throw new Error(response.error.message);
        }
        this.snackBar.open('Conta criada com sucesso!', 'Fechar', {
          duration: 3000
        });
        this.autenticado.next(true);
        return response.data;
      }),
      catchError(error => {
        this.snackBar.open(error.message || 'Erro ao atualizar perfil', 'Fechar', {
          duration: 3000
        });
        throw error;
      })
    );
  }

  /**
   * Recupera a senha do usuário
   * @param email Email do usuário
   * @returns Observable com o status da operação
   */
  recuperarSenha(email: string): Observable<boolean> {
    return from(this.supabaseService.resetPassword(email)).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return true;
      }),
      tap(() => {
        this.snackBar.open('Email enviado com instruções para recuperação de senha.', 'Fechar', {
          duration: 5000
        });
      }),
      catchError(erro => {
        console.error('Erro na recuperação de senha:', erro);
        this.snackBar.open(`Erro ao enviar email: ${erro.message}`, 'Fechar', {
          duration: 5000
        });
        return throwError(() => erro);
      })
    );
  }

  /**
   * Realiza o logout do usuário
   * @returns Observable com o status da operação
   */
  logout(): void {
    this.supabaseService.signOut().then(() => {
      this.router.navigate(['/login']);
      this.snackBar.open('Logout realizado com sucesso!', 'Fechar', {
        duration: 3000
      });
      this.autenticado.next(false);
    }).catch(error => {
      this.snackBar.open(error.message || 'Erro ao fazer logout', 'Fechar', {
        duration: 3000
      });
    });
  }

  /**
   * Verifica se o usuário está autenticado
   * @returns Observable com status booleano de autenticação
   */
  estaAutenticado(): Observable<boolean> {
    return this.autenticado.asObservable();
  }

  /**
   * Obtém os dados do usuário atual
   * @returns Observable com o usuário atual
   */
  getUsuarioAtual(): Observable<Usuario | null> {
    return this.supabaseService.getCurrentUser() as Observable<Usuario | null>;
  }
}