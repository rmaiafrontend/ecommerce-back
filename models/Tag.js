const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema({
    nome: {type: String}
});

module.exports = mongoose.model("Tag", tagSchema)