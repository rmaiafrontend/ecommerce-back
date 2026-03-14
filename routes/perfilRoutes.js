const express = require("express");
const router = express.Router();

const perfilController = require("../controllers/perfilController");
const WithAuth = require("../middleware/auth");

router.get("/perfis/me", WithAuth, perfilController.listarPerfil);
router.post("/perfis", WithAuth, perfilController.criarPerfil);
router.put("/perfis/me", WithAuth, perfilController.atualizarPerfil);

module.exports = router;