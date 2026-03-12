const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    occupation: {type: String},
    phone: {type:String},
    person: {type: mongoose.Schema.Types.ObjectId, ref:"Person", unique:true}
   
});

module.exports = mongoose.model("Profile", profileSchema)