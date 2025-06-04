import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupabaseService } from '../../../services/supabase.service';

@Component({
  selector: 'app-nova-transacao-dialog',
  template: `
    <h2 mat-dialog-title>Nova Transação</h2>
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-dialog-content>
        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Descrição</mat-label>
          <input matInput formControlName="descricao" required>
          <mat-error *ngIf="form.get('descricao')?.hasError('required')">
            Descrição é obrigatória
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Valor</mat-label>
          <input matInput type="number" formControlName="valor" required>
          <mat-error *ngIf="form.get('valor')?.hasError('required')">
            Valor é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Tipo</mat-label>
          <mat-select formControlName="tipo" required>
            <mat-option value="entrada">Entrada</mat-option>
            <mat-option value="saida">Saída</mat-option>
          </mat-select>
          <mat-error *ngIf="form.get('tipo')?.hasError('required')">
            Tipo é obrigatório
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Categoria</mat-label>
          <mat-select formControlName="categoria" required>
            <mat-option *ngFor="let categoria of data.categorias" [value]="categoria">
              {{ categoria }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="form.get('categoria')?.hasError('required')">
            Categoria é obrigatória
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Conta</mat-label>
          <mat-select formControlName="conta_id" required>
            <mat-option *ngFor="let conta of data.contas" [value]="conta.id">
              {{ conta.nome }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="form.get('conta_id')?.hasError('required')">
            Conta é obrigatória
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="full-width">
          <mat-label>Data</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="data" required>
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="form.get('data')?.hasError('required')">
            Data é obrigatória
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
export class NovaTransacaoDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NovaTransacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private supabaseService: SupabaseService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      descricao: ['', Validators.required],
      valor: [0, Validators.required],
      tipo: ['', Validators.required],
      categoria: ['', Validators.required],
      conta_id: ['', Validators.required],
      data: [new Date(), Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.supabaseService.criarTransacao(this.form.value).subscribe({
        next: () => {
          this.snackBar.open('Transação criada com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.snackBar.open('Erro ao criar transação', 'Fechar', {
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