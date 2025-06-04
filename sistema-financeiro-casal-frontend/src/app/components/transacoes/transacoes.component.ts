import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupabaseService } from '../../services/supabase.service';
import { NovaTransacaoDialogComponent } from './nova-transacao-dialog/nova-transacao-dialog.component';

@Component({
  selector: 'app-transacoes',
  template: `
    <div class="transacoes-container">
      <div class="header">
        <h2>Transações</h2>
        <button mat-raised-button color="primary" (click)="abrirDialogNovaTransacao()">
          <mat-icon>add</mat-icon>
          Nova Transação
        </button>
      </div>

      <div class="filtros">
        <mat-form-field appearance="fill">
          <mat-label>Conta</mat-label>
          <mat-select [(ngModel)]="contaFiltro" (selectionChange)="aplicarFiltros()">
            <mat-option value="">Todas as contas</mat-option>
            <mat-option *ngFor="let conta of contas" [value]="conta.id">
              {{ conta.nome }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field appearance="fill">
          <mat-label>Categoria</mat-label>
          <mat-select [(ngModel)]="categoriaFiltro" (selectionChange)="aplicarFiltros()">
            <mat-option value="">Todas as categorias</mat-option>
            <mat-option *ngFor="let categoria of categorias" [value]="categoria">
              {{ categoria }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <div class="transacoes-lista" *ngIf="transacoes.length > 0; else semTransacoes">
        <mat-card *ngFor="let transacao of transacoes" class="transacao-card">
          <mat-card-header>
            <mat-card-title>{{ transacao.descricao }}</mat-card-title>
            <mat-card-subtitle>
              {{ transacao.data | date:'dd/MM/yyyy' }} - {{ transacao.categoria }}
            </mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="valor" [ngClass]="{'entrada': transacao.tipo === 'entrada', 'saida': transacao.tipo === 'saida'}">
              {{ transacao.valor | currency:'BRL' }}
            </p>
            <p class="conta">{{ transacao.conta_nome }}</p>
          </mat-card-content>
        </mat-card>
      </div>

      <ng-template #semTransacoes>
        <div class="sem-transacoes">
          <p>Nenhuma transação encontrada.</p>
          <button mat-raised-button color="primary" (click)="abrirDialogNovaTransacao()">
            <mat-icon>add</mat-icon>
            Registrar Primeira Transação
          </button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .transacoes-container {
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .filtros {
      display: flex;
      gap: 20px;
      margin-bottom: 20px;
    }

    .transacoes-lista {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .transacao-card {
      height: 100%;
    }

    .valor {
      font-size: 1.2em;
      font-weight: bold;
      margin: 10px 0;
    }

    .entrada {
      color: #4caf50;
    }

    .saida {
      color: #f44336;
    }

    .conta {
      color: #666;
      font-size: 0.9em;
    }

    .sem-transacoes {
      text-align: center;
      padding: 40px;
    }
  `]
})
export class TransacoesComponent implements OnInit {
  transacoes: any[] = [];
  contas: any[] = [];
  categorias: string[] = [];
  contaFiltro: string = '';
  categoriaFiltro: string = '';

  constructor(
    private supabaseService: SupabaseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.carregarDados();
  }

  carregarDados() {
    // Carregar contas
    this.supabaseService.getContas().subscribe({
      next: (data) => {
        this.contas = data;
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar contas', 'Fechar', {
          duration: 3000
        });
      }
    });

    // Carregar categorias
    this.supabaseService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar categorias', 'Fechar', {
          duration: 3000
        });
      }
    });

    // Carregar transações
    this.carregarTransacoes();
  }

  carregarTransacoes() {
    this.supabaseService.getTransacoes(this.contaFiltro, this.categoriaFiltro).subscribe({
      next: (data) => {
        this.transacoes = data;
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar transações', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  aplicarFiltros() {
    this.carregarTransacoes();
  }

  abrirDialogNovaTransacao() {
    const dialogRef = this.dialog.open(NovaTransacaoDialogComponent, {
      width: '400px',
      data: { contas: this.contas, categorias: this.categorias }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarTransacoes();
      }
    });
  }
} 