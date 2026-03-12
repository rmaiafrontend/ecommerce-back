const mongoose = require("mongoose")

const personSchema = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: Number},
    profile: {type: mongoose.Schema.Types.ObjectId, ref:"Profile"}
});
module.exports = mongoose.model("Person", personSchema)
