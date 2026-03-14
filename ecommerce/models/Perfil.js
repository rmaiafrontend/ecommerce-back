const mongoose = require("mongoose")

const perfilSchema = new mongoose.Schema({
    cpf: {type: String},
    telefone: {type:String},
    fotoUrl: {type:String},
    usuario: {type: mongoose.Schema.Types.ObjectId, ref:"Usuario", unique:true}
});

module.exports = mongoose.model("Perfil", perfilSchema)