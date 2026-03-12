const express = require("express")
const personController = require("../controllers/personController")
const router = express.Router();

router.get("/person", personController.getAllPeople);
router.post("/person", personController.createPerson);
//router.delete("/tasks/:id", taskController.deleteTask);
//router.put("/tasks/:id", taskController.updateTask);

module.exports = router