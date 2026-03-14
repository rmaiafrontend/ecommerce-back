const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema({
  nome: { type: String },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
});

usuarioSchema.pre('save', async function () {
  if (this.isNew || this.isModified('senha')) {
    this.senha = await new Promise((resolve, reject) => {
      bcrypt.hash(this.senha, 10, (err, hashedPassword) => {
        if (err) reject(err);
        else resolve(hashedPassword);
      });
    });
  }
});

usuarioSchema.methods.isCorrectPassword = function (senha, callback) {
  bcrypt.compare(senha, this.senha, (err, same) => {
    if (err) callback(err);
    else callback(null, same);
  });
};

module.exports = mongoose.model("Usuario", usuarioSchema);
