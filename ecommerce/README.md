# Back-end E-commerce (estudo)

API REST simples em Node.js + Express + MongoDB (Mongoose), com autenticação JWT. Base preparada para desenvolvimento em grupo: cada aluno adiciona suas rotas e controllers seguindo as convenções abaixo.

## Como rodar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Crie o arquivo de variáveis de ambiente:
   ```bash
   cp .env.example .env
   ```
   Edite o `.env` e preencha `MONGO_URI` (URL do seu MongoDB) e `JWT_SECRET` (chave para os tokens). **Não faça commit do arquivo `.env`.**

3. Inicie o servidor:
   ```bash
   npm start
   ```
   A aplicação sobe na porta 3000.

## Variáveis de ambiente

| Variável     | Descrição |
|-------------|-----------|
| `MONGO_URI` | URL completa de conexão com o MongoDB |
| `JWT_SECRET`| Chave secreta para assinatura dos tokens JWT |

## Estrutura do projeto

- **config/** — configuração (ex.: conexão com o banco em `db.js`)
- **models/** — schemas Mongoose (Usuario, Perfil, Categoria, Produto, Tag, Pedido, etc.)
- **controllers/** — lógica das rotas (recebem `req`/`res`, acessam models)
- **routes/** — definição das rotas (Router + métodos dos controllers)
- **middleware/** — autenticação JWT (`WithAuth`) e outros middlewares

## Convenções para os outros alunos

### Adicionar novas rotas

1. Crie `controllers/nomeController.js` com as funções (ex.: `listar`, `criar`, `atualizar`, `deletar`).
2. Crie `routes/nomeRoutes.js` com `express.Router()`, defina os verbos e paths e chame os métodos do controller.
3. No `index.js`, importe as rotas e registre com:
   ```js
   app.use("/api", nomeRoutes);
   ```
   Todas as rotas ficam sob o prefixo `/api`.

### Rotas protegidas (exigem login)

Use o middleware exportado de `middleware/auth.js` (ex.: `WithAuth`):

```js
const WithAuth = require("../middleware/auth");

router.get("/recurso", WithAuth, controller.listar);
```

Após a validação do token, o email do usuário logado fica em `req.email`. Use esse valor para buscar o usuário no banco se precisar do `_id` ou de outros dados.

### Respostas e status HTTP

- Respostas sempre em JSON.
- Use status coerentes: **201** criação, **400** erro de validação, **401** não autorizado (token inválido ou ausente), **404** não encontrado, **500** erro interno.

## Endpoints já disponíveis (base)

| Método | Rota | Descrição |
|--------|------|-----------|
| POST   | `/api/register` | Cadastro de usuário. Body: `{ nome, email, senha }` |
| POST   | `/api/login`    | Login. Body: `{ email, senha }`. Retorna `{ user, token }` |

Para rotas protegidas que você criar, o cliente deve enviar o token no header:

```
Authorization: Bearer <token>
```
