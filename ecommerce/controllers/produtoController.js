const Produto = require('../models/Produto');
const Tag = require('../models/Tag');

exports.listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find().populate('tags');
    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.obterProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id).populate('tags');
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(200).json(produto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.criarProduto = async (req, res) => {
  const { nome, descricao, preco, tags } = req.body;
  const produto = new Produto({ nome, descricao, preco });

  try {
    // Associar as tags ao produto
    if (tags) {
      const tagIds = await Promise.all(tags.map(async (tagName) => {
        let tag = await Tag.findOne({ nome: tagName });
        if (!tag) {
          tag = await Tag.create({ nome: tagName });
        }
        return tag._id;
      }));
      produto.tags = tagIds;
    }

    await produto.save();
    res.status(201).json(produto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.atualizarProduto = async (req, res) => {
  const { nome, descricao, preco, tags } = req.body;

  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    if (nome) produto.nome = nome;
    if (descricao) produto.descricao = descricao;
    if (preco) produto.preco = preco;

    // Atualizar as tags
    if (tags) {
      const tagIds = await Promise.all(tags.map(async (tagName) => {
        let tag = await Tag.findOne({ nome: tagName });
        if (!tag) {
          tag = await Tag.create({ nome: tagName });
        }
        return tag._id;
      }));
      produto.tags = tagIds;
    }

    await produto.save();
    res.status(200).json(produto);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.excluirProduto = async (req, res) => {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};