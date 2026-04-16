jest.mock("../models/Usuario", () => {
  const mock = function Usuario(data) {
    Object.assign(this, data);
    this.save = jest.fn(async () => this);
  };

  mock.findOne = jest.fn(async ({ email }) => {
    if (email !== "teste@example.com") return null;
    return {
      senha: "hashed",
      isCorrectPassword: (senha, cb) => cb(null, senha === "123456"),
      toObject: () => ({ _id: "u1", nome: "Teste", email })
    };
  });

  return mock;
});

process.env.JWT_SECRET = "test-secret";

const request = require("supertest");
const createApp = require("../app");

const app = createApp();

test("POST /api/register cria usuário", async () => {
  const res = await request(app).post("/api/register").send({
    nome: "Teste",
    email: "teste@example.com",
    senha: "123456"
  });

  expect(res.statusCode).toBe(201);
});

test("POST /api/login retorna token", async () => {
  const res = await request(app).post("/api/login").send({
    email: "teste@example.com",
    senha: "123456"
  });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("token");
  expect(res.body).toHaveProperty("user");
});

