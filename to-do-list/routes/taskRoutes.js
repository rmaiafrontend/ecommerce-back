const express = require("express")
const taskController = require("../controllers/tasksController")
const router = express.Router();

const WithAuth = require("../middleware/auth")

router.get("/tasks", WithAuth, taskController.getTasks);
router.post("/tasks", taskController.createTask);
router.delete("/tasks/:id", taskController.deleteTask);
router.put("/tasks/:id", taskController.updateTask);

module.exports = router