const express = require("express");
const ImageRouter = express.Router();

const ImageModel = require("../model/imageModel");

ImageRouter.use((req, res, next) => {
    next();
});

ImageRouter.get("/:id", (req, res) => {
    var imageId = req.params.id;
    ImageModel.findById(imageId, (err, imageFound) => {
        if(err){
            res.status(500).json({success: 0, message: err})
        } else if(imageFound == null){
            res.json({success: 0, message: "Not found!"});
        } else{
            res.json({success: 0, image: imageFound});
        }
    });
})

ImageRouter.post("/", (req, res) => {
    const {name, url, caption, title} = req.body;
    ImageModel.create({name, url, caption, title}, (err, imageCreated) => {
        if(err) {
            res.status(500).json({success: 0, message: err})
        } else {
            res.status(201).json({success: 1, image: imageCreated});
        }
    })
})

ImageRouter.put("/:id", (req, res) => {
    var imageId = req.params.id;
    const {caption, title} = req.body;
    ImageModel.findById(imageId, (err, imageFound) => {
        if(err) {
            res.status(500).json({success: 0, message: err})
        } else if(!imageFound) {
            res.status(404).json({success: 0, message: "Not Found!"})
        }else {
            for(key in {caption, title}){
                if(imageFound[key] && req.body[key]){
                    imageFound[key] = req.body[key];
                }
            }
            imageFound.save((err, imageUpdated) => {
                if(err){
                    res.status(500).json({success: 0, message: err})
                } else {
                    res.json({success: 1, image: imageUpdated});
                }
            })
        }
    })
})

ImageRouter.delete("/:id", (req, res) => {
    var imageId = req.params.id;
    ImageModel.findByIdAndRemove(imageId, (err, imageRemoved) => {
        if(err) {
            res.status(500).json({success: 0, message: err})
        } else if(!imageRemoved) {
            res.status(404).json({success: 0, message: "Not Found!"})
        }else {
            res.json({success: 1, image: imageRemoved});
        }
    })
})

module.exports = ImageRouter;