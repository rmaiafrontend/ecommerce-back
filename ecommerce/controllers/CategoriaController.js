const Categoria = require("../../../ecommerce/models/Categoria");

// LISTAR
exports.listar = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// CRIAR
exports.criar = async (req, res) => {
  try {
    const { nome } = req.body;

    const categoria = new Categoria({ nome });
    await categoria.save();

    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// ATUALIZAR
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

// DELETAR
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndDelete(id);

    if (!categoria) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }

    res.status(200).json({ mensagem: "Categoria removida" });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};