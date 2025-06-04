import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupabaseService } from '../../services/supabase.service';
import { NovaContaDialogComponent } from './nova-conta-dialog/nova-conta-dialog.component';

@Component({
  selector: 'app-contas',
  template: `
    <div class="contas-container">
      <div class="header">
        <h2>Minhas Contas</h2>
        <button mat-raised-button color="primary" (click)="abrirDialogNovaConta()">
          <mat-icon>add</mat-icon>
          Nova Conta
        </button>
      </div>

      <div class="contas-grid" *ngIf="contas.length > 0; else semContas">
        <mat-card *ngFor="let conta of contas" class="conta-card">
          <mat-card-header>
            <mat-card-title>{{ conta.nome }}</mat-card-title>
            <mat-card-subtitle>{{ conta.tipo }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="saldo" [ngClass]="{'positivo': conta.saldo >= 0, 'negativo': conta.saldo < 0}">
              Saldo: {{ conta.saldo | currency:'BRL' }}
            </p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button [routerLink]="['/contas', conta.id]">
              <mat-icon>visibility</mat-icon>
              Detalhes
            </button>
          </mat-card-actions>
        </mat-card>
      </div>

      <ng-template #semContas>
        <div class="sem-contas">
          <p>Você ainda não tem contas cadastradas.</p>
          <button mat-raised-button color="primary" (click)="abrirDialogNovaConta()">
            <mat-icon>add</mat-icon>
            Criar Primeira Conta
          </button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .contas-container {
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .contas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .conta-card {
      height: 100%;
    }

    .saldo {
      font-size: 1.2em;
      font-weight: bold;
      margin: 10px 0;
    }

    .positivo {
      color: #4caf50;
    }

    .negativo {
      color: #f44336;
    }

    .sem-contas {
      text-align: center;
      padding: 40px;
    }
  `]
})
export class ContasComponent implements OnInit {
  contas: any[] = [];

  constructor(
    private supabaseService: SupabaseService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.carregarContas();
  }

  carregarContas() {
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
  }

  abrirDialogNovaConta() {
    const dialogRef = this.dialog.open(NovaContaDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarContas();
      }
    });
  }
} 