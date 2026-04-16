const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const perfilRoutes = require("./routes/perfilRoutes");
const categoriaRoutes = require("./routes/CategoriaRoutes");
const tagRoutes = require("./routes/TagRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const pedidoRoutes = require("./routes/pedidoRoutes");
const { notFound, errorHandler } = require("./middleware/error");

function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Rotas da API (prefixo /api)
  app.use("/api", userRoutes);
  app.use("/api", perfilRoutes);
  app.use("/api", categoriaRoutes);
  app.use("/api", tagRoutes);
  app.use("/api", produtoRoutes);
  app.use("/api", pedidoRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = createApp;

