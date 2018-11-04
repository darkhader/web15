const express = require("express");;
const UserRouter = express.Router();

const UserModel = require("../model/userModel");

UserRouter.use((req, res, next) => {
    next();
});

UserRouter.get("/:id", (req, res) => {
    var userId = req.params.id;
    UserModel.findById(userId, (err, userFound) => {
        if(err){
            res.status(500).json({success: 0, message: err})
        } else if(userFound == null){
            res.json({success: 0, message: "Not found!"});
        } else{
            res.json({success: 0, user: userFound});
        }
    });
});

UserRouter.post("/", (req, res) => {
    const {name, email, password, avatar, intro} = req.body;
    UserModel.create({name, email, password, avatar, intro}, (err, userCreated) => {
        if(err) {
            res.status(500).json({success: 0, message: err})
        } else {
            res.status(201).json({success: 1, user: userCreated});
        }
    })
})

UserRouter.put("/:id", (req, res) => {
    var userId = req.params.id;
    const {name, password, avatar, intro} = req.body;
    UserModel.findById(userId, (err, userFound) => {
        if(err) {
            res.status(500).json({success: 0, message: err})
        } else if(!userFound) {
            res.status(404).json({success: 0, message: "Not Found!"})
        }else {
            for(key in {name, password, avatar, intro}){
                if(userFound[key] && req.body[key]){
                    userFound[key] = req.body[key];
                }
            }
            userFound.save((err, userUpdated) => {
                if(err){
                    res.status(500).json({success: 0, message: err})
                } else {
                    res.json({success: 1, user: userUpdated});
                }
            })
        }
    })
})

UserRouter.delete("/:id", (req, res) => {
    var userId = req.params.id;
    UserModel.findByIdAndRemove(userId, (err, userRemoved) => {
        if(err) {
            res.status(500).json({success: 0, message: err})
        } else if(!userRemoved) {
            res.status(404).json({success: 0, message: "Not Found!"})
        }else {
            res.json({success: 1, user: userRemoved});
        }
    })
})

module.exports = UserRouter;