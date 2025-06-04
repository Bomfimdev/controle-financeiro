import { Usuario } from './usuario.model';

/**
 * Interface para representar uma conta compartilhada
 */
export interface Conta {
  id: string;
  nome: string;
  saldo_inicial: number;
  saldo_atual: number;
  data_criacao: string;
  ultima_atualizacao: string;
  usuario1_id: string;
  usuario2_id?: string;
  usuario1?: Usuario;
  usuario2?: Usuario;
}

/**
 * Interface para criação de uma nova conta
 */
export interface NovaConta {
  nome: string;
  saldo_inicial: number;
  usuario2_email?: string;
}