const mongoose = require("mongoose")

const produtoSchema = new mongoose.Schema({
    nome: {type: String},
    preco: {type:Number},
    categoria_id: {type: mongoose.Schema.Types.ObjectId, ref:"Categoria"}
});

module.exports = mongoose.model("Produto", produtoSchema)