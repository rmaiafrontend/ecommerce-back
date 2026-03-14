const mongoose = require("mongoose")

const itemPedidoSchema = new mongoose.Schema({
    quantidade: {type: Number},
    produto: {type: mongoose.Schema.Types.ObjectId, ref:"Produto"},
    pedido: {type: mongoose.Schema.Types.ObjectId, ref:"Pedido"},
    preco: {type: Number}
});

module.exports = mongoose.model("ItemPedido", itemPedidoSchema)