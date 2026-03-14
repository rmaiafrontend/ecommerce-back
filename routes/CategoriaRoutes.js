const express = require("express");
const router = express.Router();

const categoriaController = require("../controllers/CategoriaController");

// ROTAS

router.get("/categorias", categoriaController.listar);

router.post("/categorias", categoriaController.criar);

router.put("/categorias/:id", categoriaController.atualizar);

router.delete("/categorias/:id", categoriaController.deletar);

module.exports = router;