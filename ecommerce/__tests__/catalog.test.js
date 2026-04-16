const request = require("supertest");
const createApp = require("../app");

const app = createApp();

beforeAll(async () => {
  process.env.JWT_SECRET = "test-secret";
});

jest.mock("../models/Produto", () => ({
  find: jest.fn(() => ({
    populate: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    limit: jest.fn(async () => [])
  })),
  countDocuments: jest.fn(async () => 0)
}));

jest.mock("../models/Produtos_tags", () => ({
  find: jest.fn(() => ({
    populate: jest.fn().mockReturnThis(),
    lean: jest.fn(async () => [])
  }))
}));

test("GET /api/produtos é público e responde 200", async () => {
  const res = await request(app).get("/api/produtos");
  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty("data");
  expect(res.body).toHaveProperty("meta");
});

