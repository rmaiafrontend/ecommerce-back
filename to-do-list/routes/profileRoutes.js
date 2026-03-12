const express = require("express")
const profileController = require("../controllers/profileController")
const router = express.Router();

router.get("/profile", profileController.getAllProfiles);
router.post("/profile", profileController.createProfile);
//router.delete("/tasks/:id", taskController.deleteTask);
//router.put("/tasks/:id", taskController.updateTask);

module.exports = router