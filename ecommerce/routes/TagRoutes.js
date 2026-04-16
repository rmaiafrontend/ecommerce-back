const express = require("express");
const router = express.Router();

const tagController = require("../controllers/TagController");
const WithAuth = require("../middleware/auth");

router.get("/tags", tagController.listar);

router.post("/tags", WithAuth, tagController.criar);

router.put("/tags/:id", WithAuth, tagController.atualizar);

router.delete("/tags/:id", WithAuth, tagController.deletar);

module.exports = router;