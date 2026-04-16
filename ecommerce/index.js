require("dotenv").config();

const connectDB = require("./config/db");
const createApp = require("./app");

const app = createApp();

const PORT = Number(process.env.PORT) || 3000;

connectDB()
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Aplicação rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection error");
    console.error(err);
    process.exitCode = 1;
  });


