const express = require("express");
const router = express.Router();

const tagController = require("../controllers/TagController");

router.get("/tags", tagController.listar);

router.post("/tags", tagController.criar);

router.put("/tags/:id", tagController.atualizar);

router.delete("/tags/:id", tagController.deletar);

module.exports = router;