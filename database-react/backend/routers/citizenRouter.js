const express = require('express');
const CitizenRouter = express.Router();

const CitizenModel = require('../models/citizenModel');

// Middleware
CitizenRouter.use((req, res, next) => {
	const { citizenFound } = req.session;
	console.log("req1",req.session);
	if (citizenFound && citizenFound.role >= 1) {
		
		
		next();
		
		
	} else res.status(401).json({ success: 0,message: citizenFound });
})
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
CitizenRouter.use((req, res, next) => {
	const { citizenFound } = req.session;
	console.log(req.session);
	if (citizenFound && citizenFound.role >= 2) {
		
		
		next();
		
		
	} else res.status(401).json({ success: 0,message: "access deni2" });
})
CitizenRouter.post("/", async (req, res) => {
	
	const { name, cmt, dob, address, job } = req.body;

	try {
		const citizenCreated = await CitizenModel.create({ name, cmt, dob, address, job });
		res.status(201).json({ success: 1, citizen: citizenCreated, citizenId:citizenCreated._id  });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});
CitizenRouter.get("/", async (req, res) => {
	console.log("Get all user");
	try {
		const citizens = await CitizenModel.find({});
		res.json({ success: 1, citizens });
	} catch (error) {
		res.status(500).json({ success: 0, error: error })
	}

});

// "/api/users" => get all
CitizenRouter.put("/:id", async (req, res) => {
	const citizenId = req.params.id;
	const { name, dob, address, job } = req.body;

	try {
		const citizenFound = await CitizenModel.findById(citizenId);
		if (!citizenFound) {
			res.status(404).json({ success: 0, message: "Not found!" });
		} else {
			for (key in { name, dob, address, job }) {
				
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
// CitizenRouter.delete("/:id", (req, res) => {
// 	const citizenId = req.params.id;
// 	try {
// 		CitizenModel.remove({ _id: citizenId });
// 		res.json({ success: 1 });
// 	} catch (error) {
// 		res.status(500).json({ success: 0, message: error })
// 	}
// });
CitizenRouter.delete("/:id", (req, res) => {
	const citizenId = req.params.id;
	CitizenModel.remove({ _id: citizenId  }, (err) => {
		if(err) res.status(500).json({ success: 0, message: err})
		else res.json({ success: 1 });
	});
});


// Create user


// Edit user


module.exports = CitizenRouter;