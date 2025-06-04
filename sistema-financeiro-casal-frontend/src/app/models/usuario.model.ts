import { User } from '@supabase/supabase-js';

/**
 * Interface estendendo o User do Supabase para adicionar atributos específicos
 */
export interface Usuario extends User {
  nome?: string;
  sobrenome?: string;
  avatarUrl?: string;
}

/**
 * Interface para dados de autenticação
 */
export interface DadosAutenticacao {
  email: string;
  password: string;
}

/**
 * Interface para dados de registro
 */
export interface DadosRegistro extends DadosAutenticacao {
  nome: string;
  sobrenome: string;
}