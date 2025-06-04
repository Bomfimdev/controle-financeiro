import { TipoTransacao } from './tipos';

/**
 * Interface para representar uma transação financeira
 */
export interface Transacao {
  id: string;
  conta_id: string;
  usuario_id: string;
  descricao: string;
  valor: number;
  data: string;
  tipo: TipoTransacao;
  categoria: string;
  data_criacao: string;
  ultima_atualizacao: string;
}

/**
 * Interface para criação ou atualização de uma transação
 */
export interface TransacaoDTO {
  descricao: string;
  valor: number;
  data: string;
  tipo: TipoTransacao;
  categoria: string;
  conta_id: string;
}