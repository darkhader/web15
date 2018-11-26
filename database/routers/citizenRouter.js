const express = require('express');
const CitizenRouter = express.Router();
const bcrypt = require('bcrypt-nodejs')
const CitizenModel = require('../models/citizenModel');

// Middleware

CitizenRouter.post("/", async (req, res) => {
	
	const { name, cmt, password, dob, address, job } = req.body;
	const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync())
	try {
		const citizenCreated = await CitizenModel.create({ name, cmt, hashPassword, dob, address, job });
		res.status(201).json({ success: 1, citizen: citizenCreated });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});
// CitizenRouter.use((req, res, next) => {
// 	const { citizenInfo } = req.session;
// 	if (citizenInfo && citizenInfo.role >= 1) {
// 		next();
// 	} else res.status(404).json({ success: 0, message: "access deni" });
// })
// "/api/users" => get all
CitizenRouter.get("/", async (req, res) => {
	console.log("Get all user");
	try {
		const citizens = await CitizenModel.find({});
		res.json({ success: 1, citizens });
	} catch (error) {
		res.status(500).json({ success: 0, error: error })
	}

});

// get user by id
CitizenRouter.get("/:id", async (req, res) => {
	let citizenId = req.params.id;
	try {
		const citizenFound = await CitizenModel.findById(citizenId);
		if (!citizenFound) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, citizen: citizenFound });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

// Create user


// Edit user
CitizenRouter.put("/:id", async (req, res) => {
	const citizenId = req.params.id;
	const { name, password, dob, address, job } = req.body;

	try {
		const citizenFound = await CitizenModel.findById(citizenId);
		if (!citizenFound) {
			res.status(404).json({ success: 0, message: "Not found!" });
		} else {
			for (key in { name, password, dob, address, job }) {
				if (citizenFound["hashPassword"] && req.body["password"]) {
					const plainPassword = req.body["password"];
					const hashPassword = citizenFound["hashPassword"];
					if (!bcrypt.compareSync(plainPassword, hashPassword)) {
						citizenFound["hashPassword"] = bcrypt.hashSync(plainPassword, bcrypt.genSaltSync())
					}
				}
				if (citizenFound[key] && req.body[key]) citizenFound[key] = req.body[key];
			}
			let citizenUpdated = await citizenFound.save();
			res.json({ success: 1, user: citizenUpdated });
		}
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

// Delete user => BTVN
CitizenRouter.delete("/:id", async (req, res) => {
	const citizenId = req.params.id;
	try {
		CitizenModel.remove({ _id: citizenId });
		res.json({ success: 1 });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

module.exports = CitizenRouter;