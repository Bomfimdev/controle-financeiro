import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User, AuthResponse } from '@supabase/supabase-js';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private currentUser = new BehaviorSubject<User | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
    
    // Verificar se o usuário já está autenticado
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        this.currentUser.next(session.user);
      } else {
        this.currentUser.next(null);
      }
    });

    // Carregar usuário inicial
    this.loadUser();
  }

  private async loadUser() {
    const { data } = await this.supabase.auth.getUser();
    this.currentUser.next(data.user);
  }

  // Retorna o usuário atual como um Observable
  public getCurrentUser(): Observable<User | null> {
    return this.currentUser.asObservable();
  }

  // Retorna o usuário atual diretamente
  public getCurrentUserValue(): User | null {
    return this.currentUser.value;
  }

  // Autenticação
  public async signIn(email: string, password: string): Promise<AuthResponse> {
    const response = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (response.data?.user) {
      this.currentUser.next(response.data.user);
    }
    
    return response;
  }

  public async signUp(email: string, password: string): Promise<AuthResponse> {
    const response = await this.supabase.auth.signUp({
      email,
      password
    });
    
    if (response.data?.user) {
      this.currentUser.next(response.data.user);
    }
    
    return response;
  }

  public async signOut(): Promise<{ error: any }> {
    const { error } = await this.supabase.auth.signOut();
    if (!error) {
      this.currentUser.next(null);
    }
    return { error };
  }

  // Sessão
  public async getSession() {
    return this.supabase.auth.getSession();
  }

  // Recuperação de senha
  public async resetPassword(email: string): Promise<{ data: any, error: any }> {
    return this.supabase.auth.resetPasswordForEmail(email);
  }

  // Perfil do usuário
  async updateUserProfile(profile: { nome: string; sobrenome: string }) {
    const user = await this.getCurrentUserValue();
    if (!user) throw new Error('Usuário não autenticado');

    return this.supabase
      .from('perfis')
      .upsert({
        id: user.id,
        nome: profile.nome,
        sobrenome: profile.sobrenome,
        updated_at: new Date()
      });
  }

  async getUserProfile() {
    const user = await this.getCurrentUserValue();
    if (!user) throw new Error('Usuário não autenticado');

    return this.supabase
      .from('perfis')
      .select('*')
      .eq('id', user.id)
      .single();
  }

  // Contas
  getContas(): Observable<any[]> {
    return from(this.supabase
      .from('contas')
      .select('*')
      .order('created_at', { ascending: false }))
      .pipe(
        map(response => response.data || [])
      );
  }

  getConta(id: string): Observable<any> {
    return from(this.supabase
      .from('contas')
      .select('*')
      .eq('id', id)
      .single())
      .pipe(
        map(response => response.data)
      );
  }

  criarConta(conta: any): Observable<any> {
    return from(this.supabase
      .from('contas')
      .insert(conta)
      .select()
      .single())
      .pipe(
        map(response => response.data)
      );
  }

  async atualizarConta(id: string, conta: { nome: string; saldo_inicial: number; usuario2_email?: string }) {
    const user = await this.getCurrentUserValue();
    if (!user) throw new Error('Usuário não autenticado');

    let usuario2_id = null;
    if (conta.usuario2_email) {
      const { data: usuario2 } = await this.supabase
        .from('usuarios')
        .select('id')
        .eq('email', conta.usuario2_email)
        .single();
      
      if (usuario2) {
        usuario2_id = usuario2.id;
      }
    }

    return this.supabase
      .from('contas')
      .update({
        nome: conta.nome,
        saldo_inicial: conta.saldo_inicial,
        usuario2_id,
        updated_at: new Date()
      })
      .eq('id', id)
      .or(`usuario1_id.eq.${user.id},usuario2_id.eq.${user.id}`);
  }

  async excluirConta(id: string) {
    const user = await this.getCurrentUserValue();
    if (!user) throw new Error('Usuário não autenticado');

    return this.supabase
      .from('contas')
      .delete()
      .eq('id', id)
      .or(`usuario1_id.eq.${user.id},usuario2_id.eq.${user.id}`);
  }

  // Transações
  getTransacoes(contaId?: string, categoria?: string): Observable<any[]> {
    let query = this.supabase
      .from('transacoes')
      .select(`
        *,
        contas (
          nome
        )
      `)
      .order('data', { ascending: false });

    if (contaId) {
      query = query.eq('conta_id', contaId);
    }

    if (categoria) {
      query = query.eq('categoria', categoria);
    }

    return from(query).pipe(
      map(response => response.data || [])
    );
  }

  getTransacoesPorConta(contaId: string): Observable<any[]> {
    return from(this.supabase
      .from('transacoes')
      .select('*')
      .eq('conta_id', contaId)
      .order('data', { ascending: false }))
      .pipe(
        map(response => response.data || [])
      );
  }

  criarTransacao(transacao: any): Observable<any> {
    return from(this.supabase
      .from('transacoes')
      .insert(transacao)
      .select()
      .single())
      .pipe(
        map(response => response.data)
      );
  }

  async atualizarTransacao(
    id: string,
    transacao: {
      conta_id: string;
      valor: number;
      tipo: string;
      categoria: string;
      descricao: string;
      data: Date;
    }
  ) {
    const user = await this.getCurrentUserValue();
    if (!user) throw new Error('Usuário não autenticado');

    return this.supabase
      .from('transacoes')
      .update({
        ...transacao,
        updated_at: new Date()
      })
      .eq('id', id)
      .eq('usuario_id', user.id);
  }

  async excluirTransacao(id: string) {
    const user = await this.getCurrentUserValue();
    if (!user) throw new Error('Usuário não autenticado');

    return this.supabase
      .from('transacoes')
      .delete()
      .eq('id', id)
      .eq('usuario_id', user.id);
  }

  // Categorias
  getCategorias(): Observable<string[]> {
    return from(this.supabase
      .from('categorias')
      .select('nome')
      .order('nome'))
      .pipe(
        map(response => (response.data || []).map(cat => cat.nome))
      );
  }
}