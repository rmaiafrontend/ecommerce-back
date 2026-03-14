const Perfil = require("../models/Perfil");
const Usuario = require("../models/Usuario");


// Listar perfil do usuário logado 
const listarPerfil = async (req, res) => {
  try {
    const user = await Usuario.findOne({ email: req.email });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const perfil = await Perfil.findOne({ usuario: user._id });

    if (!perfil) {
      return res.status(404).json({ error: "Perfil não encontrado" });
    }
    res.status(200).json(perfil);

  } catch (error) {
    res.status(500).json({ error: "Erro interno" });
  }
};

// Criar perfil
const criarPerfil = async (req, res) => {
  try {

    const { cpf, telefone, fotoUrl } = req.body;

    const user = await Usuario.findOne({ email: req.email });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const perfilExistente = await Perfil.findOne({ usuario: user._id });

    if (perfilExistente) {
      return res.status(409).json({ error: "Usuário já possui perfil" });
    }

    const novoPerfil = new Perfil({
      cpf,
      telefone,
      fotoUrl,
      usuario: user._id
    });

    await novoPerfil.save();
    res.status(201).json(novoPerfil);

  } catch (error) {
    res.status(500).json({ error: "Erro interno" });
  }
};


// Atualizar perfil
const atualizarPerfil = async (req, res) => {
  try {

    const { cpf, telefone, fotoUrl } = req.body;

    const user = await Usuario.findOne({ email: req.email });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    const perfil = await Perfil.findOne({ usuario: user._id });

    if (!perfil) {
      return res.status(404).json({ error: "Perfil não encontrado" });
    }

    if (cpf) perfil.cpf = cpf;
    if (telefone) perfil.telefone = telefone;
    if (fotoUrl) perfil.fotoUrl = fotoUrl;

    await perfil.save();
    res.status(200).json(perfil);

  } catch (error) {
    res.status(500).json({ error: "Erro interno" });
  }
};

module.exports = {
  listarPerfil,
  criarPerfil,
  atualizarPerfil
};