const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    avatar: {type: String},
    intro: {type: String},
    post: [{type: String}]
});

module.exports = mongoose.model("User", UserSchema);