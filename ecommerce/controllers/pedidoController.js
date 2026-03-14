const Pedido = require("../models/Pedido");
const ItemPedido = require("../models/ItemPedido");
const Usuario = require("../models/Usuario");
const Produto = require("../models/Produto");

// Listar pedidos do usuário logado
exports.listarPedidos = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.email });
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

    const pedidos = await Pedido.find({ usuario_id: usuario._id })
      .populate({
        path: "itens",
        populate: { path: "produto" }
      });

    return res.status(200).json(pedidos);
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao listar pedidos" });
  }
};

// Buscar pedido por ID
exports.buscarPedidoPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.email });
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
    const pedido = await Pedido.findOne({ _id: req.params.id, usuario_id: usuario._id })
      .populate({
        path: "itens",
        populate: { path: "produto" }
      });

    if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado" });
    return res.status(200).json(pedido);
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao buscar pedido" });
  }
};

// Criar pedido
exports.criarPedido = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.email });
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

    const { itens, status } = req.body;
    if (!itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({ erro: "Envie ao menos um item no pedido" });
    }
    const pedido = new Pedido({
      usuario_id: usuario._id,
      status: status || "pendente",
      itens: []
    });

    // Criar itens do pedido
    for (const item of itens) {
      const produto = await Produto.findById(item.produtoId);
      if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });

      const novoItem = new ItemPedido({
        quantidade: item.quantidade,
        produto: produto._id,
        pedido: pedido._id,
        preco: item.preco
      });

      await novoItem.save();
      pedido.itens.push(novoItem._id);
    }

    await pedido.save();
    return res.status(201).json(pedido);
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao criar pedido" });
  }
};

// Atualizar status do pedido
exports.atualizarStatusPedido = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.email });
    if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });
    const pedido = await Pedido.findOne({ _id: req.params.id, usuario_id: usuario._id });

    if (!pedido) return res.status(404).json({ erro: "Pedido não encontrado" });

    pedido.status = req.body.status;
    await pedido.save();

    return res.status(200).json(pedido);
  } catch (err) {
    return res.status(500).json({ erro: "Erro ao atualizar status" });
  }
};