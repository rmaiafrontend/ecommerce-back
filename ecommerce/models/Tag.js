const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema({
    nome: {type: String},
    produto: [{ type: mongoose.Schema.Types.ObjectId, ref: "Produto" }]
});

module.exports = mongoose.model("Tag", tagSchema)