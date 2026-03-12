const User = require("../models/Usuario")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const secret = process.env.JWT_SECRET

const register = async (req, res) =>{
    const {name, email, password} = req.body

    const newUser = new User({
        name,
        email,
        password
    });

    await newUser.save()

    res.status(201).json({
        message: "Usuario Cadastrado"
    })

};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Email incorreto' });
    user.isCorrectPassword(password, (err, same) => {
      if (!same) return res.status(401).json({ error: 'senha incorreta' });

      // Gerar o token JWT
      const token = jwt.sign({ email }, secret, { expiresIn: '30d' });
      res.json({ user, token });
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno, tente novamente' });

  }

};

module.exports = {register, login}