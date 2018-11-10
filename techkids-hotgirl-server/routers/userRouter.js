const express = require('express');
const UserRouter = express.Router();

const UserModel = require('../models/userModel');

// Middleware
UserRouter.use((req, res, next) => {
	console.log("User middleware");
	next();
});

// "/api/users" => get all
UserRouter.get("/", async (req, res) => {
	console.log("Get all user");
	try {
		const users = await UserModel.find({}, "name email avatar intro posts").populate("posts");
		res.json({ success: 1, users });
	} catch (error) {
		res.status(500).json({ success: 0, error: error })
	}

});

// get user by id
UserRouter.get("/:id", async (req, res) => {
	let userId = req.params.id;
	try {
		const userFound = await UserModel.findById(userId);
		if(!userFound) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, user: userFound });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

// Create user
UserRouter.post("/", async (req, res) => {
	console.log(req.body)
	const { name, email, password, avatar, intro } = req.body;
	try {
		const userCreated = await UserModel.create({ name, email, password, avatar, intro });
		res.status(201).json({ success: 1, user: userCreated });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
	
});

// Edit user
UserRouter.put("/:id", async (req, res) => {
	const userId = req.params.id;
	const { name, password, avatar, intro, posts } = req.body;

	try {
		const userFound = await UserModel.findById(userId);
		if(!userFound) {
			res.status(404).json({ success: 0, message: "Not found!" });
		} else {
			for(key in { name, password, avatar, intro, posts }) {
				if(userFound[key] && req.body[key]) userFound[key] = req.body[key];
			}
			let userUpdated = await userFound.save();
			res.json({ success: 1, user: userUpdated });
		}
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

// Delete user => BTVN
UserRouter.delete("/:id", async (req, res) => {
	const userId = req.params.id;
	try {
		UserModel.remove({ _id: userId });
		res.json({ success: 1 });
	} catch (error) {
		res.status(500).json({ success: 0, message: error})
	}
});

module.exports = UserRouter;