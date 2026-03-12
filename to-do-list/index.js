const express = require("express")
const taskRoutes = require("./routes/taskRoutes")
const personRoutes = require("./routes/personRoutes")
const profileRoutes = require("./routes/profileRoutes")
const projectRoutes = require("./routes/projectRoutes")
const userRoutes = require("./routes/userRoutes")
const bodyParser = require("body-parser")
const connectDB = require("./config/db")

const app = express()

app.use(bodyParser.json())
app.use("/api", taskRoutes)
app.use("/api", personRoutes)
app.use("/api", profileRoutes)
app.use("/api", projectRoutes)
app.use("/api", userRoutes)

app.listen(3000, () => {
    console.log("Aplicação rodando na porta 3000")
})
