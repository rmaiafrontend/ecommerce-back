const mongoose = require("mongoose")

const categoriaSchema = new mongoose.Schema({
    nome: {type: String},
});

module.exports = mongoose.model("Categoria", categoriaSchema)