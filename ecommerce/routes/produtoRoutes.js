const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const WithAuth = require('../middleware/auth');

// Catálogo público
router.get('/produtos', produtoController.listarProdutos);
router.get('/produtos/:id', produtoController.obterProduto);

// Mutações protegidas
router.post('/produtos', WithAuth, produtoController.criarProduto);
router.put('/produtos/:id', WithAuth, produtoController.atualizarProduto);
router.delete('/produtos/:id', WithAuth, produtoController.excluirProduto);

module.exports = router;