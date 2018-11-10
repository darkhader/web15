const express = require('express');
const CommentRouter = express.Router();

const CommentModel = require('../models/commentModel');
CommentRouter.use((req, res, next) => {
	console.log("Comment middleware");
	next();
});

CommentRouter.get("/", async (req, res) => {
	console.log("Get all cmt");
	try {
		const comments = await CommentModel.find({})
			.populate("user");
		res.json({ success: 1, comments });
	} catch (error) {
		res.status(500).json({ success: 0, error: err })
	}
});

CommentRouter.get("/:id", async (req, res) => {
	let commentId = req.params.id;
	try {
		const commentFound = await CommentModel.findById(commentId);
		if (!commentFound) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, user: commentFound });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});
CommentRouter.post("/", async (req, res) => {
	console.log(req.body)
	const { user, content } = req.body;
	try {
		const commentCreated = await CommentModel.create({ user, content });
		res.status(201).json({ success: 1, user: commentCreated });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

CommentRouter.put("/:id", async (req, res) => {
	const commentId = req.params.id;
	const { url, caption, title } = req.body;
	try {
		const commentFound = await CommentModel.findById(commentId);
		if (!commentFound) res.status(404).json({ success: 0, message: "Not found!" })
		else {
			commentFound.content = content || commentFound.content

			commentFound.save((err, commentUpdated) => {
				if (err) res.status(500).json({ success: 0, message: err })
				else res.json({ success: 1, comment: commentUpdated });
			});
		};
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});


CommentRouter.delete("/:id", async (req, res) => {
	const commentId = req.params.id;
	try {
		await CommentModel.remove({ _id: commentId });
		res.json({ success: 1 });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});

module.exports = CommentRouter;