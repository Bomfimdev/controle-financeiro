# Sistema de Controle Financeiro para Casais

Este é um sistema de controle financeiro desenvolvido para casais gerenciarem suas finanças de forma compartilhada.

## Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.2.3
- Spring Security
- Spring Data JPA
- PostgreSQL
- Maven

### Frontend
- React
- TypeScript
- HTML/CSS
- Bootstrap

## Requisitos

- Java 17 ou superior
- Node.js 18 ou superior
- PostgreSQL 12 ou superior
- Maven 3.6 ou superior

## Configuração do Ambiente

### Backend

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/controle-financeiro-casal.git
cd controle-financeiro-casal
```

2. Configure o banco de dados PostgreSQL:
- Crie um banco de dados chamado `controle_financeiro`
- Configure as credenciais no arquivo `backend/src/main/resources/application.properties`

3. Execute o backend:
```bash
cd backend
mvn spring-boot:run
```

### Frontend

1. Instale as dependências:
```bash
cd frontend
npm install
```

2. Execute o frontend:
```bash
ng serve
```

3. Acesse a aplicação em `http://localhost:4200`

## Funcionalidades

- Cadastro e autenticação de usuários
- Criação de contas compartilhadas
- Registro de transações (entradas e saídas)
- Categorização de transações
- Visualização de saldo por período
- Relatórios financeiros

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🎯 Objetivo

- Acompanhar entradas e saídas mensais.
- Categorização de gastos.
- Visualização gráfica (dashboard).
- Suporte a múltiplos usuários por conta compartilhada.

## 🚀 Tecnologias Utilizadas

### Backend
- Java 17
- Spring Boot 3.2.3
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT para autenticação

### Frontend
- Angular 15
- Angular Material
- NgRx para gerenciamento de estado
- Chart.js para visualizações
- RxJS

## 📋 Pré-requisitos

- Java 17 ou superior
- Node.js 16 ou superior
- PostgreSQL 12 ou superior
- Maven
- npm ou yarn

## 🔧 Instalação

### Backend

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/controle-financeiro-casal.git
cd controle-financeiro-casal/backend
```

2. Configure o banco de dados PostgreSQL:
- Crie um banco de dados chamado `controle_financeiro`
- Configure as credenciais no arquivo `application.yml`

3. Execute o projeto:
```bash
mvn spring-boot:run
```

### Frontend

1. Entre na pasta do frontend:
```bash
cd ../frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```

O aplicativo estará disponível em `http://localhost:4200`

## 📊 Funcionalidades

### 1. Autenticação
- Cadastro e login com e-mail/senha
- Geração de token JWT

### 2. Dashboard
- Gráfico de pizza com distribuição por categoria
- Resumo financeiro mensal
- Indicadores de gastos

### 3. Transações
- Cadastro de entradas e saídas
- Categorização de gastos
- Filtros por período
- Histórico de transações

### 4. Contas Compartilhadas
- Criação de contas compartilhadas
- Adição de membros
- Visualização de saldo compartilhado

## 🔐 Segurança

- Autenticação via JWT
- Criptografia de senhas
- Proteção contra CSRF
- Validação de dados
- Sanitização de inputs

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Próximos Passos

- [ ] Implementação de metas financeiras
- [ ] Relatórios personalizados
- [ ] Notificações de gastos
- [ ] Integração com serviços de pagamento
- [ ] App mobile

---

## 🧱 Stack Tecnológico

| Camada        | Tecnologia                | Função Principal                                                      |
|---------------|---------------------------|------------------------------------------------------------------------|
| Frontend      | Angular                   | SPA com formulários, gráficos e navegação intuitiva                   |
| Backend       | Spring Boot               | API REST segura com regras de negócio e conexão ao Supabase           |
| Banco de Dados| Supabase (PostgreSQL)     | Armazenamento dos dados financeiros e dos usuários                    |
| Autenticação  | Supabase Auth (JWT)       | Cadastro/login com e-mail e senha                                     |
| Hospedagem    | Netlify (Frontend) + Railway/Render (Backend) | Solução gratuita e simples para MVP                        |

---

## 👥 Estrutura de Usuário

- Cada usuário se cadastra via Supabase Auth.
- Cada usuário pode **criar ou entrar** em uma **"Conta Compartilhada"**.
- Uma Conta Compartilhada pode ter **dois ou mais membros**, permitindo escalabilidade para grupos.

---

## 🗂️ Estrutura do Banco de Dados (Supabase)

### `shared_accounts`
| Campo        | Tipo       |
|--------------|------------|
| id           | UUID (PK)  |
| nome         | TEXT       |
| data_criacao | TIMESTAMP  |

### `shared_account_members`
| Campo     | Tipo       |
|-----------|------------|
| id        | UUID (PK)  |
| user_id   | UUID (FK)  |
| account_id| UUID (FK)  |

### `transactions`
| Campo     | Tipo        |
|-----------|-------------|
| id        | UUID (PK)   |
| account_id| UUID (FK)   |
| user_id   | UUID (FK)   |
| tipo      | Entrada/Saída |
| categoria | TEXT        |
| valor     | DECIMAL     |
| data      | DATE        |
| descricao | TEXT        |

> **Nota:** A tabela `users` pode ser omitida, pois o Supabase Auth já gerencia os usuários via UUID.

---

## 🔐 Segurança e Autenticação

- Login realizado no Angular via Supabase Auth.
- JWT gerado e armazenado no frontend.
- O token é enviado nas requisições ao backend via header `Authorization: Bearer <token>`.
- O Spring Boot valida esse JWT utilizando a chave pública da Supabase, garantindo autenticação segura.

---

## 🚀 Pronto para evoluir

Este projeto foi planejado como MVP, mas com base sólida para expansão futura:
- Novos tipos de grupos (familiares, amigos, sócios).
- Relatórios personalizados.
- Notificações financeiras.
- Planejamento de metas e orçamento.

---

Com base nas informações encontradas, vou resumir os dados relacionados ao Supabase no projeto:
Configuração do Cliente Supabase:
URL do projeto: https://ymwpwnetbizdpmdlewut.supabase.co
Chave anônima está configurada no ambiente de desenvolvimento
Estrutura do Banco de Dados:
O banco de dados possui as seguintes tabelas principais:
a) usuarios:
ID (UUID, chave primária)
Nome
Sobrenome
Email (único)
Avatar URL
Data de criação
Última atualização
b) contas:
ID (UUID, chave primária)
Nome
Saldo inicial
Saldo atual
ID do usuário 1 (obrigatório)
ID do usuário 2 (opcional)
Data de criação
Última atualização
c) transacoes:
ID (UUID, chave primária)
Descrição
Valor
Data
Tipo (ENTRADA ou SAIDA)
Categoria
ID da conta
ID do usuário
Data de criação
Última atualização
Segurança e Políticas:
Row Level Security (RLS) está habilitado em todas as tabelas
Políticas específicas para:
Usuários (apenas podem ver/editar seus próprios dados)
Contas (usuários podem ver/editar apenas contas onde são participantes)
Transações (usuários podem ver/editar apenas transações de contas onde são participantes)
Funcionalidades do Banco:
Trigger para atualização automática do saldo da conta quando há novas transações
Índices para otimização de consultas nas transações
Funções para cálculo de saldo
Integração com Backend:
O backend Spring Boot está configurado para se conectar ao Supabase
Utiliza o SDK Java do Supabase para interações
Configurações de segurança JWT implementadas
Configurações de Ambiente:
Ambiente de desenvolvimento e produção têm configurações separadas
Variáveis de ambiente para URL e chaves do Supabase
Configurações CORS para permitir acesso do frontend
Esta é uma estrutura bem organizada para um sistema financeiro para casais, com foco em segurança e compartilhamento de dados entre os parceiros.

supabase no arquivo> schema.sql
-- Criando tabelas no Supabase

-- Tabela de usuários (extensão da tabela auth.users do Supabase)
CREATE TABLE public.usuarios (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    avatar_url TEXT,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de contas (compartilhadas entre casais)
CREATE TABLE public.contas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    saldo_inicial DECIMAL(15, 2) NOT NULL DEFAULT 0,
    saldo_atual DECIMAL(15, 2) NOT NULL DEFAULT 0,
    usuario1_id UUID NOT NULL REFERENCES public.usuarios(id),
    usuario2_id UUID REFERENCES public.usuarios(id),
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de transações
CREATE TABLE public.transacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    descricao VARCHAR(200) NOT NULL,
    valor DECIMAL(15, 2) NOT NULL CHECK (valor > 0),
    data DATE NOT NULL,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('ENTRADA', 'SAIDA')),
    categoria VARCHAR(50) NOT NULL,
    conta_id UUID NOT NULL REFERENCES public.contas(id),
    usuario_id UUID NOT NULL REFERENCES public.usuarios(id),
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimizar consultas
CREATE INDEX idx_transacoes_conta_id ON public.transacoes(conta_id);
CREATE INDEX idx_transacoes_usuario_id ON public.transacoes(usuario_id);
CREATE INDEX idx_transacoes_data ON public.transacoes(data);
CREATE INDEX idx_transacoes_categoria ON public.transacoes(categoria);

-- Trigger para atualizar saldo da conta quando há nova transação
CREATE OR REPLACE FUNCTION atualizar_saldo_conta()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        IF NEW.tipo = 'ENTRADA' THEN
            UPDATE contas SET saldo_atual = saldo_atual + NEW.valor WHERE id = NEW.conta_id;
        ELSE
            UPDATE contas SET saldo_atual = saldo_atual - NEW.valor WHERE id = NEW.conta_id;
        END IF;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.tipo = 'ENTRADA' THEN
            UPDATE contas SET saldo_atual = saldo_atual - OLD.valor WHERE id = OLD.conta_id;
        ELSE
            UPDATE contas SET saldo_atual = saldo_atual + OLD.valor WHERE id = OLD.conta_id;
        END IF;
        
        IF NEW.tipo = 'ENTRADA' THEN
            UPDATE contas SET saldo_atual = saldo_atual + NEW.valor WHERE id = NEW.conta_id;
        ELSE
            UPDATE contas SET saldo_atual = saldo_atual - NEW.valor WHERE id = NEW.conta_id;
        END IF;
    ELSIF TG_OP = 'DELETE' THEN
        IF OLD.tipo = 'ENTRADA' THEN
            UPDATE contas SET saldo_atual = saldo_atual - OLD.valor WHERE id = OLD.conta_id;
        ELSE
            UPDATE contas SET saldo_atual = saldo_atual + OLD.valor WHERE id = OLD.conta_id;
        END IF;
    END IF;
    
    UPDATE contas SET ultima_atualizacao = CURRENT_TIMESTAMP WHERE id = COALESCE(NEW.conta_id, OLD.conta_id);
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_atualizar_saldo_conta
AFTER INSERT OR UPDATE OR DELETE ON public.transacoes
FOR EACH ROW EXECUTE FUNCTION atualizar_saldo_conta();

-- Função para retornar resumo por categoria
CREATE OR REPLACE FUNCTION resumo_por_categoria(p_conta_id UUID, p_data_inicio DATE DEFAULT NULL, p_data_fim DATE DEFAULT NULL)
RETURNS TABLE (
    categoria VARCHAR(50),
    total_entradas DECIMAL(15, 2),
    total_saidas DECIMAL(15, 2),
    saldo DECIMAL(15, 2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        t.categoria,
        COALESCE(SUM(CASE WHEN t.tipo = 'ENTRADA' THEN t.valor ELSE 0 END), 0) as total_entradas,
        COALESCE(SUM(CASE WHEN t.tipo = 'SAIDA' THEN t.valor ELSE 0 END), 0) as total_saidas,
        COALESCE(SUM(CASE WHEN t.tipo = 'ENTRADA' THEN t.valor ELSE -t.valor END), 0) as saldo
    FROM 
        transacoes t
    WHERE 
        t.conta_id = p_conta_id
        AND (p_data_inicio IS NULL OR t.data >= p_data_inicio)
        AND (p_data_fim IS NULL OR t.data <= p_data_fim)
    GROUP BY 
        t.categoria
    ORDER BY 
        ABS(saldo) DESC;
END;
$$ LANGUAGE plpgsql;

-- Políticas de Row Level Security (RLS)
-- Habilita RLS nas tabelas
ALTER TABLE public.usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transacoes ENABLE ROW LEVEL SECURITY;

-- Política para usuários (apenas o próprio usuário pode ver/editar seus dados)
CREATE POLICY usuarios_policy ON public.usuarios
    USING (auth.uid() = id);

-- Política para contas (usuários podem ver/editar apenas contas onde são participantes)
CREATE POLICY contas_policy ON public.contas
    USING (auth.uid() = usuario1_id OR auth.uid() = usuario2_id);

-- Política para transações (usuários podem ver/editar apenas transações de contas onde são participantes)
CREATE POLICY transacoes_policy ON public.transacoes
    USING (
        EXISTS (
            SELECT 1 FROM contas c
            WHERE c.id = conta_id
            AND (auth.uid() = c.usuario1_id OR auth.uid() = c.usuario2_id)
        )
    );





---
application proprieties:
# Configurações do servidor
server.port=8080
server.servlet.context-path=/api

# Configurações do banco de dados
spring.datasource.url=jdbc:h2:mem:sistema_financeiro_casal
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# Configurações de segurança
jwt.secret=3oqn9p/tTFdhobsHfHFPwPnp6fmrbvgUW6JUjg46E6a4aOAoZ/pWngYIv9oyQEoAgIUrbmeFNSxLYI8fND6+9Q==
jwt.expiration=604800

# Configurações do Supabase
supabase.url=https://ymwpwnetbizdpmdlewut.supabase.co
supabase.key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltd3B3bmV0Yml6ZHBtZGxld3V0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTAwNzc4NywiZXhwIjoyMDY0NTgzNzg3fQ.pUibPzN524ym_JhdDcy4W7xi7IbfR4msn5nWXDE567M
supabase.anon.key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inltd3B3bmV0Yml6ZHBtZGxld3V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkwMDc3ODcsImV4cCI6MjA2NDU4Mzc4N30.__2Pj61Jvczi9GpYVEB2-6IWWJRDmyBz4KRIZ9hjYnk

# Logging
logging.level.org.springframework.web=INFO
logging.level.org.hibernate=INFO
logging.level.com.financeiro.casal=DEBUG

# CORS
spring.web.cors.allowed-origins=http://localhost:4200
spring.web.cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.web.cors.allowed-headers=*
spring.web.cors.allow-credentials=true
spring.web.cors.max-age=3600

-------

# Guia de Migração do Sistema para Supabase

## 1. Estrutura do Banco de Dados

### Tabelas Principais

#### a) usuarios
- ID (UUID, chave primária)
- Nome
- Sobrenome
- Email (único)
- Avatar URL
- Data de criação
- Última atualização

#### b) contas
- ID (UUID, chave primária)
- Nome
- Saldo inicial
- Saldo atual
- ID do usuário 1 (obrigatório)
- ID do usuário 2 (opcional)
- Data de criação
- Última atualização

#### c) transacoes
- ID (UUID, chave primária)
- Descrição
- Valor
- Data
- Tipo (ENTRADA ou SAIDA)
- Categoria
- ID da conta
- ID do usuário
- Data de criação
- Última atualização

## 2. Configuração do Projeto

### 1. Configurar o Supabase
```typescript
// environment.ts
export const environment = {
  production: false,
  supabaseUrl: 'sua_url_do_supabase',
  supabaseKey: 'sua_chave_anon_do_supabase'
};
```

### 2. Instalar Dependências
```json
// package.json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0"
  }
}
```

## 3. Implementação dos Serviços

### 1. Serviço Base do Supabase
```typescript
// supabase.service.ts
import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // Métodos de autenticação
  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }

  // Métodos de dados
  getContas() {
    return this.supabase.from('contas').select('*');
  }

  getTransacoes(contaId: string) {
    return this.supabase
      .from('transacoes')
      .select('*')
      .eq('conta_id', contaId);
  }
}
```

### 2. Serviço de Transações
```typescript
// transacao.service.ts
@Injectable({
  providedIn: 'root'
})
export class TransacaoService {
  constructor(private supabaseService: SupabaseService) {}

  getTransacoes(contaId: string) {
    return from(this.supabaseService.getTransacoes(contaId));
  }

  criarTransacao(dados: any) {
    return from(this.supabaseService.supabase
      .from('transacoes')
      .insert(dados));
  }
}
```

### 3. Componente de Transações
```typescript
// transacoes.component.ts
@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html'
})
export class TransacoesComponent implements OnInit {
  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    this.carregarTransacoes();
  }

  carregarTransacoes() {
    this.supabaseService.getTransacoes(this.contaId).subscribe({
      next: (data) => {
        // Processar dados
      },
      error: (error) => {
        // Tratar erro
      }
    });
  }
}
```

## 4. Segurança e Políticas

### Row Level Security (RLS)
- Habilitado em todas as tabelas
- Políticas específicas para:
  - Usuários (apenas podem ver/editar seus próprios dados)
  - Contas (usuários podem ver/editar apenas contas onde são participantes)
  - Transações (usuários podem ver/editar apenas transações de contas onde são participantes)

## 5. Checklist de Implementação

1. [ ] Configurar variáveis de ambiente
2. [ ] Implementar tratamento de erros
3. [ ] Adicionar tipos TypeScript
4. [ ] Implementar interceptors para tokens
5. [ ] Configurar guards para proteção de rotas
6. [ ] Implementar políticas de segurança no Supabase

## 6. Arquivos Principais do Projeto

1. **Serviços**:
   - `supabase.service.ts`: Serviço principal
   - `transacao.service.ts`: Gerenciamento de transações
   - `conta.service.ts`: Gerenciamento de contas
   - `auth.service.ts`: Autenticação

2. **Componentes**:
   - `transacoes.component.ts`
   - `nova-transacao-dialog.component.ts`
   - `detalhes-conta.component.ts`
   - `dashboard.component.ts`
   - `contas.component.ts`
   - `nova-conta-dialog.component.ts`

3. **Configurações**:
   - `environment.ts`
   - `environment.prod.ts`

## 7. Considerações Importantes

1. **Segurança**:
   - Nunca exponha chaves secretas no frontend
   - Use variáveis de ambiente
   - Implemente autenticação adequada

2. **Performance**:
   - Use índices apropriados
   - Implemente paginação quando necessário
   - Otimize consultas

3. **Manutenção**:
   - Mantenha o código organizado
   - Documente funções importantes
   - Siga padrões de código

4. **Testes**:
   - Implemente testes unitários
   - Teste integrações
   - Valide fluxos de usuário 


-------------------------------------------

CODIGO DE REFERENCIA DO PROJETO:
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Controle Financeiro - Casal</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary-blue: rgb(1, 81, 152);
            --light-blue: rgb(223, 241, 251);
            --white: rgb(255, 255, 255);
            --text-dark: #2c3e50;
            --text-light: #7f8c8d;
            --success: #27ae60;
            --danger: #e74c3c;
            --warning: #f39c12;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, var(--light-blue) 0%, var(--white) 100%);
            min-height: 100vh;
            color: var(--text-dark);
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 20px;
        }

        /* Header */
        .header {
            background: var(--white);
            border-radius: 16px;
            padding: 20px 30px;
            margin-bottom: 30px;
            box-shadow: 0 8px 32px rgba(1, 81, 152, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .logo i {
            font-size: 32px;
            color: var(--primary-blue);
        }

        .logo h1 {
            color: var(--primary-blue);
            font-size: 24px;
            font-weight: 700;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .user-avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-blue), var(--light-blue));
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 18px;
        }

        .btn {
            padding: 12px 24px;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: inherit;
        }

        .btn-primary {
            background: var(--primary-blue);
            color: white;
        }

        .btn-primary:hover {
            background: rgba(1, 81, 152, 0.9);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(1, 81, 152, 0.3);
        }

        .btn-secondary {
            background: var(--light-blue);
            color: var(--primary-blue);
        }

        .btn-secondary:hover {
            background: rgba(223, 241, 251, 0.8);
            transform: translateY(-2px);
        }

        /* Dashboard Grid */
        .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
            margin-bottom: 30px;
        }

        .card {
            background: var(--white);
            border-radius: 20px;
            padding: 25px;
            box-shadow: 0 10px 40px rgba(1, 81, 152, 0.08);
            border: 1px solid rgba(223, 241, 251, 0.6);
            transition: all 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 60px rgba(1, 81, 152, 0.15);
        }

        .card-header {
            display: flex;
            align-items: center;
            justify-content: between;
            margin-bottom: 20px;
        }

        .card-title {
            font-size: 18px;
            font-weight: 700;
            color: var(--text-dark);
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .card-icon {
            width: 45px;
            height: 45px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            color: white;
        }

        .icon-income { background: linear-gradient(135deg, var(--success), #2ecc71); }
        .icon-expense { background: linear-gradient(135deg, var(--danger), #ff6b6b); }
        .icon-balance { background: linear-gradient(135deg, var(--primary-blue), #3498db); }
        .icon-chart { background: linear-gradient(135deg, var(--warning), #f1c40f); }

        .amount {
            font-size: 32px;
            font-weight: 800;
            margin: 15px 0;
        }

        .amount.positive { color: var(--success); }
        .amount.negative { color: var(--danger); }
        .amount.neutral { color: var(--primary-blue); }

        .period-info {
            color: var(--text-light);
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        /* Chart Container */
        .chart-container {
            position: relative;
            height: 300px;
            margin-top: 20px;
        }

        /* Transactions Section */
        .transactions-section {
            background: var(--white);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(1, 81, 152, 0.08);
            border: 1px solid rgba(223, 241, 251, 0.6);
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 25px;
            flex-wrap: wrap;
            gap: 15px;
        }

        .section-title {
            font-size: 24px;
            font-weight: 700;
            color: var(--text-dark);
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .filters {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }

        .filter-select {
            padding: 10px 15px;
            border: 2px solid var(--light-blue);
            border-radius: 12px;
            background: var(--white);
            color: var(--text-dark);
            font-family: inherit;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .filter-select:focus {
            outline: none;
            border-color: var(--primary-blue);
            box-shadow: 0 0 0 3px rgba(1, 81, 152, 0.1);
        }

        .transaction-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 20px;
            border-radius: 16px;
            margin-bottom: 12px;
            background: rgba(223, 241, 251, 0.3);
            border: 1px solid rgba(223, 241, 251, 0.6);
            transition: all 0.3s ease;
        }

        .transaction-item:hover {
            background: rgba(223, 241, 251, 0.5);
            transform: translateX(5px);
        }

        .transaction-info {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .transaction-icon {
            width: 45px;
            height: 45px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: white;
        }

        .transaction-details h4 {
            font-size: 16px;
            font-weight: 600;
            color: var(--text-dark);
            margin-bottom: 4px;
        }

        .transaction-details p {
            font-size: 14px;
            color: var(--text-light);
        }

        .transaction-amount {
            text-align: right;
        }

        .transaction-amount .amount {
            font-size: 18px;
            margin: 0;
        }

        .transaction-date {
            font-size: 12px;
            color: var(--text-light);
        }

        /* Add Transaction Form */
        .add-transaction-form {
            background: var(--white);
            border-radius: 20px;
            padding: 30px;
            margin-top: 30px;
            box-shadow: 0 10px 40px rgba(1, 81, 152, 0.08);
            border: 1px solid rgba(223, 241, 251, 0.6);
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--text-dark);
        }

        .form-input {
            width: 100%;
            padding: 15px;
            border: 2px solid var(--light-blue);
            border-radius: 12px;
            font-family: inherit;
            font-size: 16px;
            transition: all 0.3s ease;
            background: var(--white);
        }

        .form-input:focus {
            outline: none;
            border-color: var(--primary-blue);
            box-shadow: 0 0 0 3px rgba(1, 81, 152, 0.1);
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }

            .header-content {
                flex-direction: column;
                gap: 15px;
                align-items: flex-start;
            }

            .dashboard-grid {
                grid-template-columns: 1fr;
            }

            .form-row {
                grid-template-columns: 1fr;
            }

            .section-header {
                flex-direction: column;
                align-items: flex-start;
            }

            .transaction-item {
                flex-direction: column;
                align-items: flex-start;
                gap: 15px;
            }

            .transaction-amount {
                text-align: left;
                width: 100%;
            }
        }

        /* Loading Animation */
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Success/Error Messages */
        .alert {
            padding: 15px 20px;
            border-radius: 12px;
            margin-bottom: 20px;
            font-weight: 500;
        }

        .alert-success {
            background: rgba(39, 174, 96, 0.1);
            color: var(--success);
            border: 1px solid rgba(39, 174, 96, 0.2);
        }

        .alert-error {
            background: rgba(231, 76, 60, 0.1);
            color: var(--danger);
            border: 1px solid rgba(231, 76, 60, 0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- Header -->
        <header class="header">
            <div class="header-content">
                <div class="logo">
                    <i class="fas fa-heart"></i>
                    <h1>Controle Financeiro</h1>
                </div>
                <div class="user-info">
                    <div class="user-avatar">JM</div>
                    <span>João & Maria</span>
                    <button class="btn btn-secondary">
                        <i class="fas fa-cog"></i>
                        Configurações
                    </button>
                </div>
            </div>
        </header>

        <!-- Dashboard Cards -->
        <div class="dashboard-grid">
            <div class="card">
                <div class="card-header">
                    <div class="card-icon icon-income">
                        <i class="fas fa-arrow-up"></i>
                    </div>
                </div>
                <div class="card-title">Entradas</div>
                <div class="amount positive">R$ 8.500,00</div>
                <div class="period-info">
                    <i class="fas fa-calendar"></i>
                    Este mês
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-icon icon-expense">
                        <i class="fas fa-arrow-down"></i>
                    </div>
                </div>
                <div class="card-title">Saídas</div>
                <div class="amount negative">R$ 6.200,00</div>
                <div class="period-info">
                    <i class="fas fa-calendar"></i>
                    Este mês
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-icon icon-balance">
                        <i class="fas fa-wallet"></i>
                    </div>
                </div>
                <div class="card-title">Saldo</div>
                <div class="amount positive">R$ 2.300,00</div>
                <div class="period-info">
                    <i class="fas fa-trending-up"></i>
                    +15% vs mês anterior
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <div class="card-icon icon-chart">
                        <i class="fas fa-chart-pie"></i>
                    </div>
                </div>
                <div class="card-title">Categorias</div>
                <div class="chart-container">
                    <canvas id="categoryChart"></canvas>
                </div>
            </div>
        </div>

        <!-- Transactions Section -->
        <div class="transactions-section">
            <div class="section-header">
                <div class="section-title">
                    <i class="fas fa-list"></i>
                    Transações Recentes
                </div>
                <div class="filters">
                    <select class="filter-select">
                        <option>Todos os tipos</option>
                        <option>Entradas</option>
                        <option>Saídas</option>
                    </select>
                    <select class="filter-select">
                        <option>Todas as categorias</option>
                        <option>Alimentação</option>
                        <option>Transporte</option>
                        <option>Moradia</option>
                        <option>Lazer</option>
                    </select>
                    <button class="btn btn-primary">
                        <i class="fas fa-plus"></i>
                        Nova Transação
                    </button>
                </div>
            </div>

            <div id="transactionsList">
                <div class="transaction-item">
                    <div class="transaction-info">
                        <div class="transaction-icon icon-expense">
                            <i class="fas fa-shopping-cart"></i>
                        </div>
                        <div class="transaction-details">
                            <h4>Supermercado Extra</h4>
                            <p>Alimentação • Maria</p>
                        </div>
                    </div>
                    <div class="transaction-amount">
                        <div class="amount negative">-R$ 280,50</div>
                        <div class="transaction-date">Hoje</div>
                    </div>
                </div>

                <div class="transaction-item">
                    <div class="transaction-info">
                        <div class="transaction-icon icon-income">
                            <i class="fas fa-money-bill-wave"></i>
                        </div>
                        <div class="transaction-details">
                            <h4>Salário João</h4>
                            <p>Renda • João</p>
                        </div>
                    </div>
                    <div class="transaction-amount">
                        <div class="amount positive">+R$ 4.500,00</div>
                        <div class="transaction-date">2 dias atrás</div>
                    </div>
                </div>

                <div class="transaction-item">
                    <div class="transaction-info">
                        <div class="transaction-icon icon-expense">
                            <i class="fas fa-gas-pump"></i>
                        </div>
                        <div class="transaction-details">
                            <h4>Posto Shell</h4>
                            <p>Transporte • João</p>
                        </div>
                    </div>
                    <div class="transaction-amount">
                        <div class="amount negative">-R$ 120,00</div>
                        <div class="transaction-date">3 dias atrás</div>
                    </div>
                </div>

                <div class="transaction-item">
                    <div class="transaction-info">
                        <div class="transaction-icon icon-income">
                            <i class="fas fa-laptop"></i>
                        </div>
                        <div class="transaction-details">
                            <h4>Freelancer</h4>
                            <p>Renda Extra • Maria</p>
                        </div>
                    </div>
                    <div class="transaction-amount">
                        <div class="amount positive">+R$ 800,00</div>
                        <div class="transaction-date">5 dias atrás</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Transaction Form -->
        <div class="add-transaction-form" id="addTransactionForm" style="display: none;">
            <div class="section-title">
                <i class="fas fa-plus-circle"></i>
                Nova Transação
            </div>
            
            <form id="transactionForm">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Tipo</label>
                        <select class="form-input" id="transactionType">
                            <option value="income">Entrada</option>
                            <option value="expense">Saída</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Valor</label>
                        <input type="text" class="form-input" id="transactionAmount" placeholder="R$ 0,00">
                    </div>
                </div>

                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">Categoria</label>
                        <select class="form-input" id="transactionCategory">
                            <option>Alimentação</option>
                            <option>Transporte</option>
                            <option>Moradia</option>
                            <option>Lazer</option>
                            <option>Saúde</option>
                            <option>Educação</option>
                            <option>Outros</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Data</label>
                        <input type="date" class="form-input" id="transactionDate">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Descrição</label>
                    <input type="text" class="form-input" id="transactionDescription" placeholder="Descrição da transação">
                </div>

                <div style="display: flex; gap: 15px; justify-content: flex-end;">
                    <button type="button" class="btn btn-secondary" onclick="cancelTransaction()">
                        Cancelar
                    </button>
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-save"></i>
                        Salvar Transação
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script>
        // Initialize chart
        document.addEventListener('DOMContentLoaded', function() {
            const ctx = document.getElementById('categoryChart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Alimentação', 'Moradia', 'Transporte', 'Lazer', 'Outros'],
                    datasets: [{
                        data: [35, 25, 20, 12, 8],
                        backgroundColor: [
                            'rgb(1, 81, 152)',
                            'rgb(52, 152, 219)',
                            'rgb(155, 201, 235)',
                            'rgb(223, 241, 251)',
                            'rgb(189, 189, 189)'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                padding: 20,
                                usePointStyle: true,
                                font: {
                                    size: 12
                                }
                            }
                        }
                    }
                }
            });

            // Set today's date as default
            document.getElementById('transactionDate').valueAsDate = new Date();
        });

        // Show/Hide add transaction form
        document.querySelector('.btn-primary').addEventListener('click', function() {
            const form = document.getElementById('addTransactionForm');
            form.style.display = form.style.display === 'none' ? 'block' : 'none';
        });

        function cancelTransaction() {
            document.getElementById('addTransactionForm').style.display = 'none';
            document.getElementById('transactionForm').reset();
        }

        // Handle form submission
        document.getElementById('transactionForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const type = document.getElementById('transactionType').value;
            const amount = document.getElementById('transactionAmount').value;
            const category = document.getElementById('transactionCategory').value;
            const date = document.getElementById('transactionDate').value;
            const description = document.getElementById('transactionDescription').value;

            // Here you would typically send data to your backend
            console.log('New transaction:', { type, amount, category, date, description });
            
            // Show success message
            const alert = document.createElement('div');
            alert.className = 'alert alert-success';
            alert.innerHTML = '<i class="fas fa-check-circle"></i> Transação adicionada com sucesso!';
            
            const form = document.getElementById('addTransactionForm');
            form.insertBefore(alert, form.firstChild);
            
            // Remove alert after 3 seconds
            setTimeout(() => {
                alert.remove();
                cancelTransaction();
            }, 3000);
        });

        // Format currency input
        document.getElementById('transactionAmount').addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = (value / 100).toFixed(2) + '';
            value = value.replace('.', ',');
            value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            e.target.value = 'R$ ' + value;
        });

        // Mock data update simulation
        function updateDashboard() {
            // This would typically fetch data from your Supabase backend
            console.log('Updating dashboard data...');
        }

        // Update dashboard every 30 seconds
        setInterval(updateDashboard, 30000);
    </script>
</body>
</html>