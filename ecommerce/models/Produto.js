const mongoose = require("mongoose")

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  preco: { type: Number, required: true, min: 0 },
  categoria_id: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" }
}, { timestamps: true });

module.exports = mongoose.model("Produto", produtoSchema)