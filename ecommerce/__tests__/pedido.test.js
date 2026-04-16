const pedidoController = require("../controllers/pedidoController");

jest.mock("mongoose", () => ({
  startSession: jest.fn(async () => ({
    withTransaction: async (fn) => await fn(),
    endSession: jest.fn()
  }))
}));

jest.mock("../models/Usuario", () => ({
  findOne: jest.fn(async () => ({ _id: "u1", email: "cliente@example.com" }))
}));

jest.mock("../models/Produto", () => ({
  findById: jest.fn(() => ({
    session: jest.fn(async () => ({ _id: "p1", preco: 199.9 }))
  }))
}));

jest.mock("../models/Pedido", () => ({
  create: jest.fn(async () => [{ _id: "ped1", itens: [], save: jest.fn(async () => {}) }]),
  findById: jest.fn(() => ({
    populate: jest.fn(async () => ({
      _id: "ped1",
      itens: [{ preco: 199.9 }]
    }))
  }))
}));

jest.mock("../models/ItemPedido", () => ({
  insertMany: jest.fn(async () => [{ _id: "i1" }])
}));

function makeRes() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    }
  };
}

test("criarPedido usa preco do produto (ignora preco do cliente)", async () => {
  const req = {
    email: "cliente@example.com",
    body: { itens: [{ produtoId: "p1", quantidade: 1, preco: 1 }] }
  };
  const res = makeRes();

  await pedidoController.criarPedido(req, res);

  expect(res.statusCode).toBe(201);
  expect(res.body.itens[0].preco).toBeCloseTo(199.9);
});

