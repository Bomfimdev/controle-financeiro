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
- Angular 17
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
