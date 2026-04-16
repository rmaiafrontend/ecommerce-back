const mongoose = require("mongoose");
const Pedido = require("../models/Pedido");
const ItemPedido = require("../models/ItemPedido");
const Usuario = require("../models/Usuario");
const Produto = require("../models/Produto");

// Listar pedidos do usuário logado
exports.listarPedidos = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.email });
    if (!usuario) {
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Usuário não encontrado" } });
    }

    const pedidos = await Pedido.find({ usuario_id: usuario._id })
      .populate({
        path: "itens",
        populate: { path: "produto" }
      });

    return res.status(200).json(pedidos);
  } catch (err) {
    return res
      .status(500)
      .json({ error: { code: "INTERNAL", message: "Erro ao listar pedidos" } });
  }
};

// Buscar pedido por ID
exports.buscarPedidoPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.email });
    if (!usuario) {
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Usuário não encontrado" } });
    }
    const pedido = await Pedido.findOne({ _id: req.params.id, usuario_id: usuario._id })
      .populate({
        path: "itens",
        populate: { path: "produto" }
      });

    if (!pedido) {
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Pedido não encontrado" } });
    }
    return res.status(200).json(pedido);
  } catch (err) {
    return res
      .status(500)
      .json({ error: { code: "INTERNAL", message: "Erro ao buscar pedido" } });
  }
};

const STATUS_VALIDOS = new Set(["pendente", "pago", "enviado", "cancelado"]);

// Criar pedido
exports.criarPedido = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    const usuario = await Usuario.findOne({ email: req.email });
    if (!usuario) {
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Usuário não encontrado" } });
    }

    const { itens, status } = req.body;
    if (!itens || !Array.isArray(itens) || itens.length === 0) {
      return res.status(400).json({
        error: { code: "VALIDATION", message: "Envie ao menos um item no pedido" }
      });
    }

    const statusFinal = status || "pendente";
    if (!STATUS_VALIDOS.has(statusFinal)) {
      return res.status(400).json({
        error: {
          code: "VALIDATION",
          message: `status inválido. Use: ${Array.from(STATUS_VALIDOS).join(", ")}`
        }
      });
    }

    let pedidoId;
    await session.withTransaction(async () => {
      const pedido = await Pedido.create(
        [
          {
            usuario_id: usuario._id,
            status: statusFinal,
            itens: []
          }
        ],
        { session }
      );

      const pedidoDoc = pedido[0];
      pedidoId = pedidoDoc._id;

      const itensParaCriar = [];
      for (const item of itens) {
        const produtoId = item?.produtoId;
        const quantidade = Number(item?.quantidade);

        if (!produtoId || !Number.isFinite(quantidade) || quantidade <= 0) {
          const err = new Error("Itens inválidos (produtoId e quantidade > 0 são obrigatórios)");
          err.status = 400;
          err.code = "VALIDATION";
          throw err;
        }

        const produto = await Produto.findById(produtoId).session(session);
        if (!produto) {
          const err = new Error("Produto não encontrado");
          err.status = 404;
          err.code = "NOT_FOUND";
          throw err;
        }

        itensParaCriar.push({
          quantidade,
          produto: produto._id,
          pedido: pedidoDoc._id,
          preco: produto.preco
        });
      }

      const itensCriados = await ItemPedido.insertMany(itensParaCriar, { session });
      pedidoDoc.itens = itensCriados.map((i) => i._id);
      await pedidoDoc.save({ session });
    });

    const pedidoCriado = await Pedido.findById(pedidoId)
      .populate({ path: "itens", populate: { path: "produto" } });

    return res.status(201).json(pedidoCriado);
  } catch (err) {
    const statusCode = Number(err?.status) || 500;
    const code = err?.code || (statusCode === 500 ? "INTERNAL" : "ERROR");
    return res
      .status(statusCode)
      .json({ error: { code, message: err?.message || "Erro ao criar pedido" } });
  } finally {
    session.endSession();
  }
};

// Atualizar status do pedido
exports.atualizarStatusPedido = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.email });
    if (!usuario) {
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Usuário não encontrado" } });
    }
    const pedido = await Pedido.findOne({ _id: req.params.id, usuario_id: usuario._id });

    if (!pedido) {
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Pedido não encontrado" } });
    }

    const novoStatus = req.body?.status;
    if (!STATUS_VALIDOS.has(novoStatus)) {
      return res.status(400).json({
        error: {
          code: "VALIDATION",
          message: `status inválido. Use: ${Array.from(STATUS_VALIDOS).join(", ")}`
        }
      });
    }

    pedido.status = novoStatus;
    await pedido.save();

    return res.status(200).json(pedido);
  } catch (err) {
    return res.status(500).json({
      error: { code: "INTERNAL", message: "Erro ao atualizar status" }
    });
  }
};