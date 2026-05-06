# GullaEvents Backend

🎪 Plataforma modular para gestão de eventos com foco em venda de ingressos, carteira digital (cashless) e operação de pagamentos via QR Code.

## 📋 Características

✅ **Autenticação JWT** - Segurança de ponta a ponta
✅ **QR Code Assinado** - HMAC-SHA256 contra fraudes
✅ **Carteira Digital** - Saldo em tempo real
✅ **Sistema de Pagamentos** - Débito atômico e audit trail
✅ **PostgreSQL** - Banco de dados robusto e escalável
✅ **Docker Compose** - Setup em um comando
✅ **TypeScript** - Type-safe e robustez
✅ **Logs Estruturados** - Winston para auditoria completa

## 🚀 Quick Start

### Pré-requisitos
- Docker & Docker Compose
- Node.js 18+
- npm ou yarn

### Instalação (5 minutos)

```bash
# 1. Clone o repositório
git clone https://github.com/sapogood-maker/gullaevents-.git
cd gullaevents-

# 2. Configure o ambiente
cp .env.example .env

# 3. Inicie com Docker Compose
docker-compose up -d

# 4. Espere o banco de dados estar pronto
sleep 10

# 5. Execute as migrations
npm install
npm run migrate

# 6. Inicie o servidor
npm run dev
```

**API disponível em:** `http://localhost:3000`

## 📊 API Endpoints

### 🔐 Autenticação
```
POST   /api/auth/register         - Registrar novo usuário
POST   /api/auth/login            - Login e gerar JWT
```

### 👤 Usuários
```
GET    /api/users/:id             - Perfil do usuário
GET    /api/users/profile         - Perfil autenticado
```

### 🎪 Eventos
```
GET    /api/events                - Listar eventos
POST   /api/events                - Criar evento (admin)
GET    /api/events/:id            - Detalhes do evento
```

### 🎟️ Ingressos
```
POST   /api/tickets               - Comprar ingresso
GET    /api/tickets/:id           - Detalhes do ingresso
GET    /api/tickets              - Meus ingressos
```

### 🔍 QR Code
```
POST   /api/qr/validate           - Validar QR Code
```

### 💳 Carteira
```
GET    /api/wallet/:userId        - Saldo e info
POST   /api/wallet/topup          - Recarga de saldo
```

### 💰 Pagamentos
```
POST   /api/payments              - Processar pagamento
GET    /api/transactions          - Histórico de transações
```

### 📦 Produtos
```
GET    /api/products              - Listar produtos
POST   /api/products              - Criar produto (admin)
```

### ❤️ Health
```
GET    /api/health                - Status da API
```

## 🏗️ Arquitetura

```
src/
├── config/              # Configurações (DB, JWT, Environment)
├── controllers/         # Lógica de requisições HTTP
├── services/           # Lógica de negócio
├── models/             # Schemas TypeORM
├── middleware/         # Autenticação, validação, erros
├── routes/             # Definição de endpoints
├── utils/              # Funções auxiliares (QR, crypto, logger)
├── migrations/         # Scripts SQL
├── types/              # TypeScript definitions
└── server.ts          # Entrada da aplicação
```

## 🔐 Segurança

### QR Code
- Assinado com HMAC-SHA256
- Contém: `ticketId`, `userId`, `timestamp`, `signature`
- Validação servidor-side obrigatória
- Proteção contra replay attacks

### Autenticação
- JWT com HS256
- Token expira em 24h (configurável)
- Rate limiting em endpoints sensíveis

### Banco de Dados
- Prepared statements contra SQL injection
- Índices otimizados para performance
- Transações ACID para operações críticas

## 🛠️ Desenvolvimento

### Scripts Disponíveis
```bash
npm run dev              # Inicia em modo desenvolvimento
npm run build           # Compila TypeScript
npm start              # Inicia em produção
npm run typecheck      # Verifica tipos TypeScript
npm run migrate        # Executa migrations
npm run seed           # Popula dados de teste
npm test               # Executa testes
npm run lint           # Lint do código
npm run format         # Formata código com Prettier
```

### Variáveis de Ambiente
```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/gulla_events
JWT_SECRET=your-super-secret-key-min-32-chars
QR_SECRET_KEY=your-super-secret-qr-key-min-32-chars
CORS_ORIGIN=http://localhost:3000,http://localhost:8080
LOG_LEVEL=debug
```

## 📦 Stack Técnico

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Linguagem:** TypeScript
- **Banco de Dados:** PostgreSQL 15
- **ORM:** TypeORM
- **Validação:** Zod
- **Autenticação:** JWT + jsonwebtoken
- **QR Code:** qrcode
- **Segurança:** bcryptjs, helmet, cors
- **Logging:** Winston
- **Testes:** Jest
- **Container:** Docker & Docker Compose

## 🚢 Deployment

### Docker
```bash
# Build image
docker build -t gulla-events-backend .

# Run container
docker run -p 3000:3000 --env-file .env gulla-events-backend
```

### Docker Compose
```bash
# Production mode
DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml up -d
```

## 📝 Fluxo Principal

### Usuário
1. Registra e faz login
2. Compra ingresso do evento
3. Recebe QR Code assinado
4. Recarrega saldo na carteira
5. Vai ao evento

### No Evento
1. Apresenta QR Code
2. App Flutter escaneia
3. Backend valida assinatura
4. Retorna dados do usuário e saldo
5. Seleciona produto/valor
6. Backend debita atomicamente
7. Confirma pagamento

## 🔄 Payment Layer (Future)

Arquitetura preparada para integração com:
- PIX (Celcoin, Bancário, etc)
- Credit Card (Stripe, etc)
- Wallet externos

Use adapter pattern para adicionar novos provedores sem alterações no core.

## 📊 Monitoramento

- Logs estruturados em `logs/`
- Audit trail completo de transações
- Health check em `/api/health`
- Rate limiting automático
- Error tracking detalhado

## 🤝 Contribuindo

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

MIT © GullaEvents Team

## 🎯 Roadmap

- [ ] Frontend Next.js/React
- [ ] App Flutter para caixa
- [ ] Integração PIX
- [ ] Credit Card Support
- [ ] Admin Dashboard
- [ ] Analytics & Reports
- [ ] Web3 Integration
- [ ] Blockchain for Tickets

## 📞 Suporte

Tem dúvidas? Abra uma [issue](https://github.com/sapogood-maker/gullaevents-/issues) ou entre em contato.

---

**Made with ❤️ by GullaEvents Team**
