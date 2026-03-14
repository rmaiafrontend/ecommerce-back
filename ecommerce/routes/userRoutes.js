const express = require("express");
const usuarioController = require("../controllers/userController");
const router = express.Router();

router.post("/register", usuarioController.register);
router.post("/login", usuarioController.login);

module.exports = router;
