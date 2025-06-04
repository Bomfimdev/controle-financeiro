import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  template: `
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard">
        <mat-icon matListItemIcon>dashboard</mat-icon>
        <span matListItemTitle>Dashboard</span>
      </a>
      <a mat-list-item routerLink="/contas">
        <mat-icon matListItemIcon>account_balance</mat-icon>
        <span matListItemTitle>Contas</span>
      </a>
      <a mat-list-item routerLink="/transacoes">
        <mat-icon matListItemIcon>swap_horiz</mat-icon>
        <span matListItemTitle>Transações</span>
      </a>
    </mat-nav-list>
  `,
  styles: [`
    mat-nav-list {
      width: 250px;
    }
  `]
})
export class SidenavComponent {} 