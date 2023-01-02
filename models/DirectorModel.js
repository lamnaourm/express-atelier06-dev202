const mongoose = require('mongoose')
const {Schema} = require('mongoose')

const DirectorSchema = new Schema({
    name: String,
    birthname: String,
    birthdate:String,
    birthplace:String
}, {collection: "directors"})

module.exports = mongoose.model("directors", DirectorSchema, "directors");