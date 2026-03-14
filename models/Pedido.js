const mongoose = require("mongoose")

const pedidosSchema = new mongoose.Schema({
    usuario_id: {type: mongoose.Schema.Types.ObjectId, ref:"Usuario"},
    status: {type:String},
    itens: [{type: mongoose.Schema.Types.ObjectId, ref:"ItemPedido"}],
});

module.exports = mongoose.model("Pedido", pedidosSchema)