const express = require('express');
const ImageRouter = express.Router();

const ImageModel = require('../models/imageModel');
ImageRouter.use((req, res, next) => {
	console.log("Image middleware");
	next();
});
// "/api/images" => get all
ImageRouter.get("/", async (req, res) => {
	console.log("Get all image");
	try {
		const images = await ImageModel.find({})
			.populate("user", "name avatar");
		res.json({ success: 1, images });
	} catch (error) {
		res.status(500).json({ success: 0, error: err })
	}
});

// get user by id
ImageRouter.get("/:id", async (req, res) => {
	let imageId = req.params.id;
	try {
		const imageFound = await ImageModel.findById(imageId);
		if (!imageFound) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, user: imageFound });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});

// Create user
ImageRouter.post("/", async (req, res) => {
	console.log(req.body)
	const { user, url, caption, title } = req.body;
	try {
		const image = await ImageModel.create({ user, url, caption, title });
		res.status(201).json({ success: 1, user: imageCreated });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

// Edit user
ImageRouter.put("/:id", async (req, res) => {
	const imageId = req.params.id;
	const { url, caption, title } = req.body;
	try {
		const imageFound = await ImageModel.findById(imageId);
		if (!imageFound) res.status(404).json({ success: 0, message: "Not found!" })
		else {
			for (key in { url, caption, title }) {
				if (imageFound[key] && req.body[key]) imageFound[key] = req.body[key];
			}

			imageFound.save((err, imageUpdated) => {
				if (err) res.status(500).json({ success: 0, message: err })
				else res.json({ success: 1, image: imageUpdated });
			});
		};
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});

// Delete user => BTVN
ImageRouter.delete("/:id", async (req, res) => {
	const imageId = req.params.id;
	try {
		const image = await ImageModel.remove({ _id: imageId });
		res.json({ success: 1 });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});

module.exports = ImageRouter;