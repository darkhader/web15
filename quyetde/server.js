
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const questionList = JSON.parse(fs.readFileSync('./questions.json'));
let questionRandom ;
app.use(express.static('public'));

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
app.get('/result', (req, res) => {
    res.sendFile(__dirname + '/public/result.html');
});
app.post('/result', (req, res) => {
    res.sendFile(__dirname + '/public/result.html');
});



app.post('/ask', (req, res) => {
    console.log(req.body);
   

    const newQuestion = {
        id: questionList.length,
        questionContent: req.body.questionContent,
        yes: 0,
        no: 0
    };
    questionList.push(newQuestion);


    fs.writeFileSync('./questions.json', JSON.stringify(questionList));
    res.redirect('/answer')

});
app.get("/ramdomQuestion", (req, res) => {
   
    if (questionList.length > 0) {
        let randomIndex = Math.floor(Math.random() * questionList.length);
        questionRandom = questionList[randomIndex];
        res.send(questionRandom);
        
    }
    
    
})
app.post('/answer', (req, res) => {
    const { questionID, answer } = req.body;
    

    questionList[questionID][answer] += 1;

    fs.writeFileSync('./questions.json', JSON.stringify(questionList));
    res.send({ success: 1 })
});
app.get('/resultquest', (req,res) => {
    if(questionList.length > 0){
        let resultQuest = questionRandom;
        res.send(resultQuest); 
        
    }
});




app.listen(3000, (err) => {
    if (err) console.log(err)
    else console.log('Server is listening at port 3000');
});
