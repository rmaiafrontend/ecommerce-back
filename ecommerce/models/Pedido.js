const mongoose = require("mongoose")

const pedidosSchema = new mongoose.Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  status: {
    type: String,
    enum: ["pendente", "pago", "enviado", "cancelado"],
    default: "pendente",
    required: true
  },
  itens: [{ type: mongoose.Schema.Types.ObjectId, ref: "ItemPedido" }]
}, { timestamps: true });

module.exports = mongoose.model("Pedido", pedidosSchema)