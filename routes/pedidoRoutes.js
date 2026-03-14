const express = require("express");
const router = express.Router();
const WithAuth = require("../middleware/auth"); // middleware de autenticação
const pedidoController = require("../controllers/pedidoController");

// Rotas protegidas pelo middleware WithAuth
router.get("/pedidos", WithAuth, pedidoController.listarPedidos);
router.get("/pedidos/:id", WithAuth, pedidoController.buscarPedidoPorId);
router.post("/pedidos", WithAuth, pedidoController.criarPedido);
router.put("/pedidos/:id", WithAuth, pedidoController.atualizarStatusPedido);

module.exports = router;