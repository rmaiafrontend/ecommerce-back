const mongoose = require("mongoose")

const produtosTagSchema = new mongoose.Schema({
    produto_id: {type: mongoose.Schema.Types.ObjectId, ref:"Produto"},
    tag_id: {type: mongoose.Schema.Types.ObjectId, ref:"Tag"}
});

module.exports = mongoose.model("ProdutosTags", produtosTagSchema)