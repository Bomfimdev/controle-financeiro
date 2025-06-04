import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { SupabaseService } from './supabase.service';
import { Transacao, TransacaoDTO } from '../models/transacao.model';
import { FiltroTransacao, ResumoCategoria } from '../models/tipos';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  
  constructor(
    private supabaseService: SupabaseService,
    private snackBar: MatSnackBar
  ) { }

  /**
   * Obtém transações de uma conta específica com filtros opcionais
   * @param contaId ID da conta
   * @param filtros Filtros opcionais (tipo, categoria, datas)
   * @returns Observable com a lista de transações
   */
  getTransacoesDaConta(contaId: string, filtros?: FiltroTransacao): Observable<Transacao[]> {
    return from(this.supabaseService.getTransacoesDaConta(contaId, filtros)).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return data as Transacao[];
      }),
      catchError(erro => {
        console.error('Erro ao obter transações:', erro);
        this.snackBar.open(`Erro ao carregar transações: ${erro.message}`, 'Fechar', {
          duration: 3000
        });
        return throwError(() => erro);
      })
    );
  }

  /**
   * Cria uma nova transação
   * @param transacao Dados da transação
   * @returns Observable com a transação criada
   */
  criarTransacao(transacao: TransacaoDTO): Observable<Transacao> {
    const usuarioId = this.supabaseService.getCurrentUserValue()?.id;
    
    if (!usuarioId) {
      return throwError(() => new Error('Usuário não autenticado'));
    }
    
    const dados = {
      ...transacao,
      usuario_id: usuarioId
    };
    
    return from(this.supabaseService.criarTransacao(dados)).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        if (!data) {
          throw new Error('Erro ao criar transação: resposta vazia do servidor');
        }
        return data as Transacao;
      }),
      tap(() => {
        this.snackBar.open('Transação registrada com sucesso!', 'Fechar', {
          duration: 3000
        });
      }),
      catchError(erro => {
        console.error('Erro ao criar transação:', erro);
        this.snackBar.open(`Erro ao registrar transação: ${erro.message}`, 'Fechar', {
          duration: 5000
        });
        return throwError(() => erro);
      })
    );
  }

  /**
   * Atualiza uma transação existente
   * @param id ID da transação
   * @param dados Dados atualizados da transação
   * @returns Observable com status da operação
   */
  atualizarTransacao(id: string, dados: Partial<TransacaoDTO>): Observable<boolean> {
    return from(this.supabaseService.atualizarTransacao(id, dados)).pipe(
      map(({ error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return true;
      }),
      tap(() => {
        this.snackBar.open('Transação atualizada com sucesso!', 'Fechar', {
          duration: 3000
        });
      }),
      catchError(erro => {
        console.error('Erro ao atualizar transação:', erro);
        this.snackBar.open(`Erro ao atualizar transação: ${erro.message}`, 'Fechar', {
          duration: 5000
        });
        return throwError(() => erro);
      })
    );
  }

  /**
   * Exclui uma transação
   * @param id ID da transação
   * @returns Observable com status da operação
   */
  excluirTransacao(id: string): Observable<boolean> {
    return from(this.supabaseService.excluirTransacao(id)).pipe(
      map(({ error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return true;
      }),
      tap(() => {
        this.snackBar.open('Transação excluída com sucesso!', 'Fechar', {
          duration: 3000
        });
      }),
      catchError(erro => {
        console.error('Erro ao excluir transação:', erro);
        this.snackBar.open(`Erro ao excluir transação: ${erro.message}`, 'Fechar', {
          duration: 5000
        });
        return throwError(() => erro);
      })
    );
  }

  /**
   * Obtém a lista de categorias distintas usadas nas transações
   * @returns Observable com a lista de categorias
   */
  getCategorias(): Observable<string[]> {
    return from(this.supabaseService.getCategorias()).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        // Usa Set para garantir valores únicos
        return [...new Set(data?.map(item => item.categoria))].filter(Boolean);
      }),
      catchError(erro => {
        console.error('Erro ao obter categorias:', erro);
        return throwError(() => erro);
      })
    );
  }

  /**
   * Obtém resumo por categoria para uma conta específica
   * @param contaId ID da conta
   * @param periodo Opcional: período para filtrar (início e fim)
   * @returns Observable com o resumo por categoria
   */
  getResumoPorCategoria(contaId: string, periodo?: { inicio: string, fim: string }): Observable<ResumoCategoria[]> {
    return from(this.supabaseService.getResumoPorCategoria(contaId, periodo)).pipe(
      map(({ data, error }) => {
        if (error) {
          throw new Error(error.message);
        }
        return data as ResumoCategoria[];
      }),
      catchError(erro => {
        console.error('Erro ao obter resumo por categoria:', erro);
        this.snackBar.open(`Erro ao carregar resumo por categoria: ${erro.message}`, 'Fechar', {
          duration: 3000
        });
        return throwError(() => erro);
      })
    );
  }
}