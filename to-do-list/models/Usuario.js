const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userSchema.pre('save', function (next) {

  if (this.isNew || this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      if (err) next(err);
      else {
        this.password = hashedPassword;
        next();
      }
    });
  }
});

userSchema.methods.isCorrectPassword = function (password, callback) {

  bcrypt.compare(password, this.password, (err, same) => {
    if (err) callback(err);

    else callback(null, same);

  });

};

module.exports = mongoose.model("Usuario", userSchema )