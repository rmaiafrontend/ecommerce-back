const express = require("express")
const usuarioController = require("../controllers/userController")
const router = express.Router();

router.post("/register", usuarioController.register);
router.post("/login", usuarioController.login);
//router.delete("/tasks/:id", taskController.deleteTask);
//router.put("/tasks/:id", taskController.updateTask);

module.exports = router