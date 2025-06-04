import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-detalhes-conta',
  template: `
    <div class="detalhes-conta-container" *ngIf="conta">
      <div class="header">
        <button mat-icon-button (click)="voltar()">
          <mat-icon>arrow_back</mat-icon>
        </button>
        <h2>{{ conta.nome }}</h2>
      </div>

      <mat-card class="info-card">
        <mat-card-content>
          <div class="info-item">
            <span class="label">Tipo:</span>
            <span class="value">{{ conta.tipo }}</span>
          </div>
          <div class="info-item">
            <span class="label">Saldo Atual:</span>
            <span class="value" [ngClass]="{'positivo': conta.saldo >= 0, 'negativo': conta.saldo < 0}">
              {{ conta.saldo | currency:'BRL' }}
            </span>
          </div>
        </mat-card-content>
      </mat-card>

      <div class="transacoes-section">
        <h3>Últimas Transações</h3>
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
            </mat-card-content>
          </mat-card>
        </div>

        <ng-template #semTransacoes>
          <div class="sem-transacoes">
            <p>Nenhuma transação encontrada para esta conta.</p>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .detalhes-conta-container {
      padding: 20px;
    }

    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
    }

    .info-card {
      margin-bottom: 20px;
    }

    .info-item {
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }

    .label {
      color: #666;
    }

    .value {
      font-weight: bold;
    }

    .positivo {
      color: #4caf50;
    }

    .negativo {
      color: #f44336;
    }

    .transacoes-section {
      margin-top: 20px;
    }

    .transacoes-lista {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
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

    .sem-transacoes {
      text-align: center;
      padding: 40px;
      color: #666;
    }
  `]
})
export class DetalhesContaComponent implements OnInit {
  conta: any = null;
  transacoes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private supabaseService: SupabaseService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const contaId = this.route.snapshot.paramMap.get('id');
    if (contaId) {
      this.carregarConta(contaId);
      this.carregarTransacoes(contaId);
    }
  }

  carregarConta(contaId: string) {
    this.supabaseService.getConta(contaId).subscribe({
      next: (data) => {
        this.conta = data;
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar conta', 'Fechar', {
          duration: 3000
        });
        this.router.navigate(['/contas']);
      }
    });
  }

  carregarTransacoes(contaId: string) {
    this.supabaseService.getTransacoesPorConta(contaId).subscribe({
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

  voltar() {
    this.router.navigate(['/contas']);
  }
} 