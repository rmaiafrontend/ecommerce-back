const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const newUser = new Usuario({
      nome,
      email,
      senha
    });

    await newUser.save();

    res.status(201).json({
      message: "Usuario cadastrado"
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "Email já cadastrado" });
    }
    res.status(500).json({ error: "Erro ao cadastrar usuário", message: error.message });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const user = await Usuario.findOne({ email });
    if (!user) return res.status(401).json({ error: "Email incorreto" });

    user.isCorrectPassword(senha, (err, same) => {
      if (err) return res.status(500).json({ error: "Erro interno, tente novamente" });
      if (!same) return res.status(401).json({ error: "Senha incorreta" });

      const token = jwt.sign({ email }, secret, { expiresIn: "30d" });
      const { _id, nome, email: userEmail } = user.toObject();
      res.json({
        user: { _id, nome, email: userEmail },
        token
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Erro interno, tente novamente" });
  }
};

module.exports = { register, login };
