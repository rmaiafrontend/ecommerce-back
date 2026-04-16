const mongoose = require("mongoose")

const perfilSchema = new mongoose.Schema({
  cpf: { type: String, trim: true },
  telefone: { type: String, trim: true },
  fotoUrl: { type: String, trim: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", unique: true, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Perfil", perfilSchema)