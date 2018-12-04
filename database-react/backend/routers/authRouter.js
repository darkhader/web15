const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const AuthRouter = express.Router();

const CitizenModel = require('../models/citizenModel');

AuthRouter.get("/", (req, res) => {
	const { citizenFound } = req.session || {};
	if (citizenFound) {
		res.json({ success: 1, citizenFound, message: "Login successful" });
	} else {
		res.status(401).json({ success: 0 });
	}
})

AuthRouter.post("/login", async (req, res) => {

	const { name, citizenId } = req.body;

	try {
		if(name !="admin"){
			const citizenFound = await CitizenModel.findOne({ name });

			if (!citizenFound || !citizenFound._id) {
				res.status(404).json({ success: 0, message: "No such citizen" });
			} else {
				if (!citizenId || citizenId != citizenFound.cmt) {
					res.status(404).json({ success: 0, message: "sai CMT" });
				}
				else {
					req.session.citizenFound = {
						name: citizenFound.name,
						id:citizenFound._id,
						role: 1
					}
					res.json({ success: 1, citizenFound, message: "Login successful" });
				}
				// console.log(citizenFound);
				// req.session.citizenFound = citizenFound;
				// // res.send(citizenFound);
	
			}
		}
		if(name == "admin"){
			const citizenFound = await CitizenModel.findOne({ name });

		if (!citizenFound || !citizenFound._id) {
			res.status(404).json({ success: 0, message: "No such citizen" });
		} else {
			if (!citizenId || citizenId != citizenFound.cmt) {
				res.status(404).json({ success: 0, message: "sai CMT" });
			}
			else {
				req.session.citizenFound = {
					name: citizenFound.name,
					id:citizenFound._id,
					role: 2
				}
				res.json({ success: 1, citizenFound, message: "Login successful" });
			}
			// console.log(citizenFound);
			// req.session.citizenFound = citizenFound;
			// // res.send(citizenFound);

		}
		}
		

	} catch (error) {
		res.status(500).json({ success: 0, error1: error })
	}
});
AuthRouter.delete("/logout", (req, res) => {

	req.session.citizenInfo = undefined;
	req.session.destroy();
	res.json({ success: 1, message: "F11" })
})
module.exports = AuthRouter;