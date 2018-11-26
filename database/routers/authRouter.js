const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const AuthRouter = express.Router();

const CitizenModel = require('../models/citizenModel');

AuthRouter.post("/login", async (req, res) => {
    const { cmt, password } = req.body;
	try {
		let ctitzenFound = await CitizenModel.findOne({ cmt });
        
		if(!ctitzenFound || !ctitzenFound._id) {
			res.status(404).json({ success: 0, message: "No such citizen" });
		} else {
			if(!bcrypt.compareSync(password, ctitzenFound.hashPassword)) {
				res.status(401).json({ success: 0, message: "Wrong password" });
			} else {
				req.session.citizenInfo = {
					id: citizenInfo._id,
					cmt: citizenInfo.cmt,
                    name: citizenInfo.name,
                    role:1
				}
				res.json({ success: 1, message: "Login successful"});
			}
		}
	} catch (error) {
		res.status(500).json({ success: 0, error })
	}
});
AuthRouter.delete("/logout",(req, res) => {
    
    req.session.citizenInfo=undefined;
    req.session.destroy();
    res.json({success:1, message:"F11"})
} )
module.exports = AuthRouter;