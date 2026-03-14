const mongoose = require("mongoose")

const task = new mongoose.Schema({
    titulo:{type: String, required: true, unique: true},
    descricao:{type: String, required: true},
    status: {type: Boolean},
    person: {type:mongoose.Schema.Types.ObjectId, ref:"Person"},
    projects: [{type:mongoose.Schema.Types.ObjectId, ref:"Project"}]

});

module.exports = mongoose.model("Task", task )