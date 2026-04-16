const Produto = require("../models/Produto");
const ProdutosTags = require("../models/Produtos_tags");

function parsePositiveInt(value, fallback) {
  const n = Number.parseInt(String(value), 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

exports.listarProdutos = async (req, res) => {
  try {
    const page = parsePositiveInt(req.query.page, 1);
    const limit = Math.min(parsePositiveInt(req.query.limit, 20), 100);
    const skip = (page - 1) * limit;

    const [produtos, total] = await Promise.all([
      Produto.find().populate("categoria_id").skip(skip).limit(limit),
      Produto.countDocuments()
    ]);

    const produtoIds = produtos.map((p) => p._id);
    const vinculos = await ProdutosTags.find({ produto_id: { $in: produtoIds } })
      .populate("tag_id")
      .lean();

    const tagsPorProduto = new Map();
    for (const v of vinculos) {
      const key = String(v.produto_id);
      const prev = tagsPorProduto.get(key) || [];
      if (v.tag_id) prev.push(v.tag_id);
      tagsPorProduto.set(key, prev);
    }

    const data = produtos.map((p) => {
      const tags = tagsPorProduto.get(String(p._id)) || [];
      return { ...p.toObject(), tags };
    });

    res.status(200).json({
      data,
      meta: { page, limit, total }
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: { code: "INTERNAL", message: err.message || "Erro interno" } });
  }
};

exports.obterProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id).populate("categoria_id");
    if (!produto) {
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Produto não encontrado" } });
    }
    const vinculos = await ProdutosTags.find({ produto_id: produto._id }).populate("tag_id");
    const tags = vinculos.map((v) => v.tag_id).filter(Boolean);
    res.status(200).json({ ...produto.toObject(), tags });
  } catch (err) {
    res
      .status(500)
      .json({ error: { code: "INTERNAL", message: err.message || "Erro interno" } });
  }
};

exports.criarProduto = async (req, res) => {
  try {
    const { nome, preco, categoria_id, tagIds } = req.body;
    if (!nome || preco === undefined) {
      return res.status(400).json({
        error: { code: "VALIDATION", message: "nome e preco são obrigatórios" }
      });
    }
    const produto = new Produto({ nome, preco, categoria_id });
    await produto.save();

    if (tagIds && Array.isArray(tagIds) && tagIds.length > 0) {
      await ProdutosTags.insertMany(
        tagIds.map((tag_id) => ({ produto_id: produto._id, tag_id }))
      );
    }

    const vinculos = await ProdutosTags.find({ produto_id: produto._id }).populate("tag_id");
    const tags = vinculos.map((v) => v.tag_id).filter(Boolean);
    res.status(201).json({ ...produto.toObject(), tags });
  } catch (err) {
    res
      .status(400)
      .json({ error: { code: "BAD_REQUEST", message: err.message || "Erro na requisição" } });
  }
};

exports.atualizarProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Produto não encontrado" } });
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

    const vinculos = await ProdutosTags.find({ produto_id: produto._id }).populate("tag_id");
    const tags = vinculos.map((v) => v.tag_id).filter(Boolean);
    const atualizado = await Produto.findById(produto._id).populate("categoria_id");
    res.status(200).json({ ...atualizado.toObject(), tags });
  } catch (err) {
    res
      .status(400)
      .json({ error: { code: "BAD_REQUEST", message: err.message || "Erro na requisição" } });
  }
};

exports.excluirProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) {
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Produto não encontrado" } });
    }
    await ProdutosTags.deleteMany({ produto_id: req.params.id });
    res.sendStatus(204);
  } catch (err) {
    res
      .status(500)
      .json({ error: { code: "INTERNAL", message: err.message || "Erro interno" } });
  }
};
