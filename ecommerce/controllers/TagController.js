const Tag = require("../models/Tag");

// LISTAR
exports.listar = async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: { code: "INTERNAL", message: error.message } });
  }
};

// CRIAR
exports.criar = async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res
        .status(400)
        .json({ error: { code: "VALIDATION", message: "nome é obrigatório" } });
    }

    const tag = new Tag({ nome });
    await tag.save();

    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ error: { code: "INTERNAL", message: error.message } });
  }
};

// ATUALIZAR
exports.atualizar = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!tag) {
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Tag não encontrada" } });
    }

    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json({ error: { code: "INTERNAL", message: error.message } });
  }
};

// DELETAR
exports.deletar = async (req, res) => {
  try {
    const { id } = req.params;

    const tag = await Tag.findByIdAndDelete(id);

    if (!tag) {
      return res
        .status(404)
        .json({ error: { code: "NOT_FOUND", message: "Tag não encontrada" } });
    }

    res.status(200).json({ mensagem: "Tag removida" });
  } catch (error) {
    res.status(500).json({ error: { code: "INTERNAL", message: error.message } });
  }
};