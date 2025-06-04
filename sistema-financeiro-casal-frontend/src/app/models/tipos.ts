/**
 * Enum and interface definitions for the financial system
 */

// Enum para os tipos de transação
export enum TipoTransacao {
  ENTRADA = 'ENTRADA',
  SAIDA = 'SAIDA'
}

// Categorias padrão para transações
export const CATEGORIAS_PADRAO = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Vestuário',
  'Presentes',
  'Investimentos',
  'Outros'
];

// Interface para filtro de transações
export interface FiltroTransacao {
  tipo?: TipoTransacao;
  categoria?: string;
  dataInicio?: string;
  dataFim?: string;
}

// Interface para resumo por categoria
export interface ResumoCategoria {
  categoria: string;
  totalEntradas: number;
  totalSaidas: number;
  saldo: number;
}