# Sistema Financeiro para Casal - Frontend

Este é o frontend do Sistema Financeiro para Casal, uma aplicação desenvolvida para auxiliar casais na gestão financeira compartilhada.

## Tecnologias Utilizadas

- Angular 16
- Angular Material
- TypeScript
- Supabase (Autenticação e Banco de Dados)
- Chart.js (para visualização de dados)

## Funcionalidades

- **Autenticação de Usuários**: Registro, login e recuperação de senha
- **Gerenciamento de Contas**: Criar, visualizar, editar e excluir contas compartilhadas
- **Gerenciamento de Transações**: Registrar receitas e despesas com categorias
- **Análise de Gastos**: Visualização de resumo por categorias com gráficos
- **Dashboard**: Visão geral das finanças do casal

## Estrutura do Projeto

- **components/**: Componentes reutilizáveis da interface
- **models/**: Interfaces e tipos de dados
- **services/**: Serviços para comunicação com o backend e Supabase
- **pages/**: Componentes de páginas completas
- **shared/**: Componentes compartilhados como layout, header, etc.

## Configuração do Ambiente

### Pré-requisitos

- Node.js (v14+)
- Angular CLI (v16+)

### Instalação

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione as variáveis do Supabase:
     ```
     SUPABASE_URL=sua_url_do_supabase
     SUPABASE_KEY=sua_chave_anon_do_supabase
     API_URL=url_do_backend
     ```

### Execução

Para executar o projeto em ambiente de desenvolvimento:
