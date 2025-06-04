import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-nova-conta-dialog',
  template: `
    <h2 mat-dialog-title>Nova Conta</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Nome da Conta</mat-label>
          <input matInput formControlName="nome" required>
          <mat-error *ngIf="form.get('nome')?.hasError('required')">
            Nome é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Tipo de Conta</mat-label>
          <mat-select formControlName="tipo" required>
            <mat-option value="corrente">Conta Corrente</mat-option>
            <mat-option value="poupanca">Conta Poupança</mat-option>
            <mat-option value="carteira">Carteira</mat-option>
            <mat-option value="investimento">Investimento</mat-option>
            <mat-option value="outro">Outro</mat-option>
          </mat-select>
          <mat-error *ngIf="form.get('tipo')?.hasError('required')">
            Tipo é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Saldo Inicial</mat-label>
          <input matInput type="number" formControlName="saldo" required>
          <mat-error *ngIf="form.get('saldo')?.hasError('required')">
            Saldo é obrigatório
          </mat-error>
        </mat-form-field>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button type="button" (click)="onCancel()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
          Salvar
        </button>
      </mat-dialog-actions>
    </form>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 15px;
    }
  `]
})
export class NovaContaDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NovaContaDialogComponent>,
    private supabaseService: SupabaseService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      tipo: ['', Validators.required],
      saldo: [0, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.supabaseService.criarConta(this.form.value).subscribe({
        next: () => {
          this.snackBar.open('Conta criada com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.snackBar.open('Erro ao criar conta', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
} 