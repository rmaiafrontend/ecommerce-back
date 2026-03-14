const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const perfilRoutes = require("./routes/perfilRoutes");
const categoriaRoutes = require("./routes/CategoriaRoutes");
const tagRoutes = require("./routes/TagRoutes");
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();


app.use(express.json());

// Rotas da API (prefixo /api)
app.use("/api", userRoutes);
app.use("/api", perfilRoutes);
app.use("/api", categoriaRoutes);
app.use("/api", tagRoutes);
// Outros alunos: adicionar aqui as novas rotas, ex.:
// app.use("/api", perfilRoutes);
// app.use("/api", categoriaRoutes);
// app.use("/api", tagRoutes);
app.use('/api', produtoRoutes);
// app.use("/api", pedidoRoutes);

app.listen(3000, () => {
  console.log("Aplicação rodando na porta 3000");
});


