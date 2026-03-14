const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const WithAuth = require('../middleware/auth');

router.get('/produtos', WithAuth, produtoController.listarProdutos);
router.get('/produtos/:id', WithAuth, produtoController.obterProduto);
router.post('/produtos', WithAuth, produtoController.criarProduto);
router.put('/produtos/:id', WithAuth, produtoController.atualizarProduto);
router.delete('/produtos/:id', WithAuth, produtoController.excluirProduto);

module.exports = router;