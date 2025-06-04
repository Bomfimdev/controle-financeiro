import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <app-header *ngIf="mostrarMenu"></app-header>
      <mat-sidenav-container>
        <mat-sidenav mode="side" opened *ngIf="mostrarMenu">
          <app-sidenav></app-sidenav>
        </mat-sidenav>
        <mat-sidenav-content>
          <div class="content">
            <router-outlet></router-outlet>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    mat-sidenav-container {
      flex: 1;
    }

    .content {
      padding: 20px;
    }
  `]
})
export class AppComponent {
  mostrarMenu = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.estaAutenticado().subscribe(autenticado => {
      this.mostrarMenu = autenticado;
      if (!autenticado) {
        this.router.navigate(['/login']);
      }
    });
  }
}