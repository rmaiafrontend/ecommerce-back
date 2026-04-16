const mongoose = require("mongoose")

const itemPedidoSchema = new mongoose.Schema({
  quantidade: { type: Number, required: true, min: 1 },
  produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true },
  pedido: { type: mongoose.Schema.Types.ObjectId, ref: "Pedido", required: true, index: true },
  // snapshot do preço no momento da compra
  preco: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model("ItemPedido", itemPedidoSchema)