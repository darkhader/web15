const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitizenSchema = new Schema({
	name: { type: String, required: true },
	cmt: { type: String, required: true, unique: true },
	sex: { type: String, required: true},
	sđt: { type: String, required: true, unique: true},
	dob: { type: String, required: true },
	address: { type: String, required: true },
	job: { type: String, required: true },

});

module.exports = mongoose.model("Citizen", CitizenSchema);