const express = require("express");
const CommentRouter = express.Router();

const CommentModel = require("../model/commentModel");

CommentRouter.use((req, res, next) => {
    next();
});

CommentRouter.get("/:id", (req, res) => {
    var commentId = req.params.id;
    CommentModel.findById(commentId, (err, commentFound) => {
        if(err){
            res.status(500).json({success: 0, message: err})
        } else if(commentFound == null){
            res.json({success: 0, message: "Not found!"});
        } else{
            res.json({success: 0, comment: commentFound});
        }
    });
})

CommentRouter.post("/", (req, res) => {
    const {user, content} = req.body;
    CommentModel.create({user, content}, (err, commentCreated) => {
        if(err) {
            res.status(500).json({success: 0, message: err})
        } else {
            res.status(201).json({success: 1, comment: commentCreated});
        }
    })
})

CommentRouter.put("/:id", (req, res) => {
    var commentId = req.params.id;
    const {content} = req.body;
    CommentModel.findById(commentId, (err, commentFound) => {
        if(err) {
            res.status(500).json({success: 0, message: err})
        } else if(!commentFound) {
            res.status(404).json({success: 0, message: "Not Found!"})
        }else {
            for(key in {content}){
                if(commentFound[key] && req.body[key]){
                    commentFound[key] = req.body[key];
                }
            }
            commentFound.save((err, commentUpdated) => {
                if(err){
                    res.status(500).json({success: 0, message: err})
                } else {
                    res.json({success: 1, comment: commentUpdated});
                }
            })
        }
    })
})

CommentRouter.delete("/:id", (req, res) => {
    var commentId = req.params.id;
    CommentModel.findByIdAndRemove(commentId, (err, commentRemoved) => {
        if(err) {
            res.status(500).json({success: 0, message: err})
        } else if(!commentRemoved) {
            res.status(404).json({success: 0, message: "Not Found!"})
        }else {
            res.json({success: 1, comment: commentRemoved});
        }
    })
})

module.exports = CommentRouter;