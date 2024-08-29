const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loginScema = new Schema({
    email : String,
    ph_num : Number,
    pass : String,
});


const LoginDb = mongoose.model("Login", loginScema);
module.exports = LoginDb;