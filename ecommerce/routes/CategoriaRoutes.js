const express = require("express");
const router = express.Router();

const categoriaController = require("../controllers/CategoriaController");
const WithAuth = require("../middleware/auth");

// ROTAS

router.get("/categorias", categoriaController.listar);

router.post("/categorias", WithAuth, categoriaController.criar);

router.put("/categorias/:id", WithAuth, categoriaController.atualizar);

router.delete("/categorias/:id", WithAuth, categoriaController.deletar);

module.exports = router;