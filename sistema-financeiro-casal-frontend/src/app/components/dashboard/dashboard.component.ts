import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Dashboard</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="dashboard-content">
            <div class="welcome-section">
              <h2>Bem-vindo ao Controle Financeiro Casal!</h2>
              <p>Gerencie suas finanças de forma simples e eficiente.</p>
            </div>

            <div class="quick-actions">
              <button mat-raised-button color="primary" routerLink="/contas">
                <mat-icon>account_balance</mat-icon>
                Gerenciar Contas
              </button>
              <button mat-raised-button color="accent" routerLink="/transacoes">
                <mat-icon>swap_horiz</mat-icon>
                Gerenciar Transações
              </button>
            </div>

            <div class="summary-section">
              <mat-card>
                <mat-card-header>
                  <mat-card-title>Resumo Financeiro</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <p>Em breve: Gráficos e estatísticas das suas finanças</p>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .dashboard-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .welcome-section {
      text-align: center;
      margin-bottom: 20px;
    }

    .welcome-section h2 {
      color: #1976d2;
      margin-bottom: 10px;
    }

    .quick-actions {
      display: flex;
      gap: 20px;
      justify-content: center;
      margin-bottom: 20px;
    }

    .quick-actions button {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
    }

    .summary-section {
      margin-top: 20px;
    }

    mat-card {
      margin-bottom: 20px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  constructor(
    private supabaseService: SupabaseService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Verificar se o usuário está autenticado
    const user = this.supabaseService.getCurrentUserValue();
    if (!user) {
      this.router.navigate(['/login']);
      this.snackBar.open('Por favor, faça login para acessar o dashboard', 'Fechar', {
        duration: 3000
      });
    }
  }
} 