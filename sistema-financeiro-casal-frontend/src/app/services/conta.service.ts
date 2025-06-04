import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { Conta, NovaConta } from '../models/conta.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  
  constructor(
    private supabaseService: SupabaseService,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Obtém todas as contas do usuário logado
   * @returns Observable com a lista de contas
   */
  getContasDoUsuario(): Observable<Conta[]> {
    return from(this.supabaseService.getContasDoUsuario()).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return data as Conta[];
      }),
      catchError(erro => {
        console.error('Erro ao obter contas:', erro);
        this.snackBar.open(`Erro ao carregar contas: ${erro.message}`, 'Fechar', {
          duration: 3000
        });
        return throwError(() => erro);
      })
    );
  }

  /**
   * Obtém os detalhes de uma conta específica
   * @param id ID da conta
   * @returns Observable com os dados da conta
   */
  getConta(id: string): Observable<Conta> {
    return from(this.supabaseService.getConta(id)).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        if (!data) {
          throw new Error('Conta não encontrada');
        }
        return data as Conta;
      }),
      catchError(erro => {
        console.error(`Erro ao obter conta ${id}:`, erro);
        this.snackBar.open(`Erro ao carregar detalhes da conta: ${erro.message}`, 'Fechar', {
          duration: 3000
        });
        return throwError(() => erro);
      })
    );
  }

  /**
   * Cria uma nova conta
   * @param novaConta Dados da nova conta
   * @returns Observable com a conta criada
   */
  criarConta(novaConta: NovaConta): Observable<Conta> {
    return from(this.supabaseService.criarConta(
      novaConta.nome, 
      novaConta.saldo_inicial, 
      novaConta.usuario2_email
    )).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        if (!data) {
          throw new Error('Erro ao criar conta: resposta vazia do servidor');
        }
        return data as Conta;
      }),
      tap(() => {
        this.snackBar.open('Conta criada com sucesso!', 'Fechar', {
          duration: 3000
        });
      }),
      catchError(erro => {
        console.error('Erro ao criar conta:', erro);
        this.snackBar.open(`Erro ao criar conta: ${erro.message}`, 'Fechar', {
          duration: 5000
        });
        return throwError(() => erro);
      })
    );
  }

  /**
   * Atualiza uma conta existente
   * @param id ID da conta
   * @param dados Dados atualizados da conta
   * @returns Observable com status da operação
   */
  atualizarConta(id: string, dados: Partial<Conta>): Observable<boolean> {
    return from(this.supabaseService.atualizarConta(id, dados)).pipe(
      map(({ error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return true;
      }),
      tap(() => {
        this.snackBar.open('Conta atualizada com sucesso!', 'Fechar', {
          duration: 3000
        });
      }),
      catchError(erro => {
        console.error('Erro ao atualizar conta:', erro);
        this.snackBar.open(`Erro ao atualizar conta: ${erro.message}`, 'Fechar', {
          duration: 5000
        });
        return throwError(() => erro);
      })
    );
  }

  /**
   * Exclui uma conta
   * @param id ID da conta
   * @returns Observable com status da operação
   */
  excluirConta(id: string): Observable<boolean> {
    return from(this.supabaseService.excluirConta(id)).pipe(
      map(({ error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return true;
      }),
      tap(() => {
        this.snackBar.open('Conta excluída com sucesso!', 'Fechar', {
          duration: 3000
        });
      }),
      catchError(erro => {
        console.error('Erro ao excluir conta:', erro);
        this.snackBar.open(`Erro ao excluir conta: ${erro.message}`, 'Fechar', {
          duration: 5000
        });
        return throwError(() => erro);
      })
    );
  }

  /**
   * Convida um usuário para compartilhar a conta
   * @param contaId ID da conta
   * @param email Email do usuário convidado
   * @returns Observable com status da operação
   */
  convidarUsuario(contaId: string, email: string): Observable<boolean> {
    // Primeiro buscar o ID do usuário pelo e-mail
    return from(this.supabaseService.getSupabase()
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .single()).pipe(
        map(({ data, error }) => {
          if (error) {
            throw new Error(`Usuário não encontrado: ${error.message}`);
          }
          if (!data) {
            throw new Error('Usuário não encontrado');
          }
          return data.id;
        }),
        // Depois atualizar a conta com o ID do usuário
        map(usuarioId => {
          return from(this.supabaseService.atualizarConta(contaId, { usuario2_id: usuarioId })).pipe(
            map(({ error }) => {
              if (error) {
                throw new Error(error.message);
              }
              return true;
            }),
            tap(() => {
              this.snackBar.open('Usuário adicionado com sucesso à conta!', 'Fechar', {
                duration: 3000
              });
            })
          );
        }),
        catchError(erro => {
          console.error('Erro ao convidar usuário:', erro);
          this.snackBar.open(`Erro ao convidar usuário: ${erro.message}`, 'Fechar', {
            duration: 5000
          });
          return throwError(() => erro);
        })
      );
  }
}