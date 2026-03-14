const Produto = require("../models/Produto");
const ProdutosTags = require("../models/Produtos_tags");

async function getTagsDoProduto(produtoId) {
  const vinculos = await ProdutosTags.find({ produto_id: produtoId }).populate("tag_id");
  return vinculos.map((v) => v.tag_id);
}

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find().populate("categoria_id");
    const produtosComTags = await Promise.all(
      produtos.map(async (p) => {
        const tags = await getTagsDoProduto(p._id);
        return { ...p.toObject(), tags };
      })
    );
    res.status(200).json(produtosComTags);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.obterProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id).populate("categoria_id");
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    const tags = await getTagsDoProduto(produto._id);
    res.status(200).json({ ...produto.toObject(), tags });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.criarProduto = async (req, res) => {
  try {
    const { nome, preco, categoria_id, tagIds } = req.body;
    const produto = new Produto({ nome, preco, categoria_id });
    await produto.save();

    if (tagIds && Array.isArray(tagIds) && tagIds.length > 0) {
      await ProdutosTags.insertMany(
        tagIds.map((tag_id) => ({ produto_id: produto._id, tag_id }))
      );
    }

    const tags = await getTagsDoProduto(produto._id);
    res.status(201).json({ ...produto.toObject(), tags });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    const { nome, preco, categoria_id, tagIds } = req.body;
    if (nome !== undefined) produto.nome = nome;
    if (preco !== undefined) produto.preco = preco;
    if (categoria_id !== undefined) produto.categoria_id = categoria_id;
    await produto.save();

    if (tagIds !== undefined && Array.isArray(tagIds)) {
      await ProdutosTags.deleteMany({ produto_id: produto._id });
      if (tagIds.length > 0) {
        await ProdutosTags.insertMany(
          tagIds.map((tag_id) => ({ produto_id: produto._id, tag_id }))
        );
      }
    }

    const tags = await getTagsDoProduto(produto._id);
    const atualizado = await Produto.findById(produto._id).populate("categoria_id");
    res.status(200).json({ ...atualizado.toObject(), tags });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.excluirProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    await ProdutosTags.deleteMany({ produto_id: req.params.id });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
