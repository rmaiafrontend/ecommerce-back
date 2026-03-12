const express = require("express")
const projectController = require("../controllers/projectController")
const router = express.Router();

router.get("/project", projectController.getAllProjetos);
router.post("/project", projectController.createProject);
//router.delete("/tasks/:id", taskController.deleteTask);
//router.put("/tasks/:id", taskController.updateTask);

module.exports = router