const mongoose = require("mongoose")

const produtosTagSchema = new mongoose.Schema({
  produto_id: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true, index: true },
  tag_id: { type: mongoose.Schema.Types.ObjectId, ref: "Tag", required: true, index: true }
}, { timestamps: true });

produtosTagSchema.index({ produto_id: 1, tag_id: 1 }, { unique: true });

module.exports = mongoose.model("ProdutosTags", produtosTagSchema)