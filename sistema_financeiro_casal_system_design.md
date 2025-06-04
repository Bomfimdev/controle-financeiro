# Design do Sistema de Controle Financeiro para Casais

## Abordagem de Implementação

Para desenvolver o sistema de controle financeiro para casais, utilizaremos:

1. **Frontend**:
   - Angular 15+ como framework principal
   - NgRx para gerenciamento de estado
   - Angular Material para componentes de UI
   - Chart.js para visualizações gráficas
   - LocalStorage para armazenamento temporário (// futuro: Supabase)

2. **Arquitetura**:
   - Padrão de Arquitetura Modular do Angular
   - Serviços para lógica de negócios
   - Componentes reutilizáveis
   - Interceptors para manipulação de requisições
   - Guards para proteção de rotas

3. **Estratégia de Armazenamento**:
   - LocalStorage para dados persistentes
   - Comentários indicando pontos de migração para Supabase

## Módulos Principais

1. **AuthModule**:
   - Gerenciamento de autenticação e autorização
   - Login/Registro de usuários
   // futuro: integração com Supabase Auth

2. **DashboardModule**:
   - Visualização geral das finanças
   - Gráficos e indicadores

3. **TransacoesModule**:
   - Gerenciamento de transações financeiras
   - CRUD de lançamentos

4. **ContasModule**:
   - Gerenciamento de contas individuais e compartilhadas

5. **SharedModule**:
   - Componentes e serviços compartilhados

## Pontos de Atenção

1. **Migração Futura**:
   - Todos os serviços que utilizam localStorage terão interfaces preparadas para migração
   - Comentários indicando pontos de integração com Supabase

2. **Segurança**:
   - Implementação de guards para rotas protegidas
   - Criptografia de dados sensíveis no localStorage

3. **Performance**:
   - Lazy loading de módulos
   - Implementação de cache para dados frequentemente acessados

## Pontos a Esclarecer

1. Definição de limites para armazenamento no localStorage
2. Estratégia de backup dos dados locais
3. Política de expiração de dados no localStorage
