const Usuario = require("../models/Usuario");
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        error: { code: "VALIDATION", message: "email e senha são obrigatórios" }
      });
    }

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
      return res.status(409).json({
        error: { code: "CONFLICT", message: "Email já cadastrado" }
      });
    }
    res.status(500).json({
      error: { code: "INTERNAL", message: "Erro ao cadastrar usuário" }
    });
  }
};

const login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(400).json({
        error: { code: "VALIDATION", message: "email e senha são obrigatórios" }
      });
    }

    const user = await Usuario.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: { code: "UNAUTHORIZED", message: "Email ou senha inválidos" }
      });
    }

    user.isCorrectPassword(senha, (err, same) => {
      if (err) {
        return res.status(500).json({
          error: { code: "INTERNAL", message: "Erro interno, tente novamente" }
        });
      }
      if (!same) {
        return res.status(401).json({
          error: { code: "UNAUTHORIZED", message: "Email ou senha inválidos" }
        });
      }

      const token = jwt.sign({ email }, secret, { expiresIn: "30d" });
      const { _id, nome, email: userEmail } = user.toObject();
      res.json({
        user: { _id, nome, email: userEmail },
        token
      });
    });
  } catch (error) {
    res.status(500).json({
      error: { code: "INTERNAL", message: "Erro interno, tente novamente" }
    });
  }
};

module.exports = { register, login };
