const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    startDate: {type: Date, default: Date.now},
    endDate: {type:Date},
    tasks: [{type: mongoose.Schema.Types.ObjectId, ref:"Task"}]
})

module.exports = mongoose.model("Project", projectSchema)