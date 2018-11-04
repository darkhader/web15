const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    user: {type: String},
    view: {type: Number, default: 0},
    like: {type: String, require: true, default: 0},
    url: {type: String, require: true},
    caption: {type: String},
    title: {type: String, require: true},
    comment: [{type: String}]
}, {
    timestamps: true    // created_at & updated_at
});

module.exports = mongoose.model("Image", ImageSchema);