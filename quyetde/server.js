const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const QuestionModel = require('./models/questionModel')


mongoose.connect("mongodb://localhost/quyetde", (err) => {
	if (err) console.log("err")

});


app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/answer.html');
});

app.get('/ask', (req, res) => {
	res.sendFile(__dirname + '/public/ask.html');
});

app.get('/answer', (req, res) => {
	res.sendFile(__dirname + '/public/answer.html');
});

app.post('/createquestion', (req, res) => {


	QuestionModel.create({
		questionContent: req.body.questionContent
	}, (err, questionCreate) => {
		if (err) console.log(err)
		else res.redirect('/question/' + questionCreate._id);
	}
	)


});

app.get('/randomquestion', (req, res) => {
	QuestionModel.count({}, (err, count) => {
		let randomIndex = Math.floor(Math.random() * count);
		QuestionModel.findOne({}, null, { skip: randomIndex }, (err, questionFound) => {
			if (err) console.log(err)
			else res.send(questionFound);
		})
	})

})



app.post('/answer', (req, res) => {

	const { answer, questionid } = req.body;
	console.log(questionid)
	QuestionModel.findById(questionid, (err, questionFound) => {
		if (err) console.log(err)
		else if (!questionFound) console.log('not found1')
		else {
			questionFound[answer] += 1;
			questionFound.save((err) => {
				if (err) console.log(err)
				else res.send({ success: 1 });
			});
		}
	});
});

app.get('/question/:questionId', (req, res) => {
	res.sendFile(__dirname + "/public/detail.html");
});

app.get('/questiondetail/:questionid', (req, res) => {

	const { questionid } = req.params;
	
	QuestionModel.findById(questionid, (err, questionFound) => {
		if (err) console.log(err)
		else if (!questionFound) console.log('not found')
		else res.send({ success: 1, question: questionFound });
	});



});

app.use(express.static('public'));

app.listen(3000, (err) => {
	if (err) console.log(err)
	else console.log('Server is listening at port 3000');
});