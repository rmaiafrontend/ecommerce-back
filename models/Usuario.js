const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema({
  nome: { type: String },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true }
});

usuarioSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('senha')) {
    bcrypt.hash(this.senha, 10, (err, hashedPassword) => {
      if (err) next(err);
      else {
        this.senha = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

usuarioSchema.methods.isCorrectPassword = function (senha, callback) {
  bcrypt.compare(senha, this.senha, (err, same) => {
    if (err) callback(err);
    else callback(null, same);
  });
};

module.exports = mongoose.model("Usuario", usuarioSchema);
