const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const session = require('express-session')


mongoose.connect("mongodb://localhost/citizen", { useNewUrlParser: true }, (err) => {
    if (err) console.log(err)
    else console.log("Success")

});
const citizenRouter = require('./routers/citizenRouter');
const authRouter = require('./routers/authRouter');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
	secret:"keybroadhero",
	resave:false,
	saveUninitialized:false,
	cookie:{
		secure:false,
		httpOnly:false,
		maxAge:7*24*60*60*1000
	}
}))
app.use(cors({ origin: [ "http://localhost:3000" ], credentials: true }));
// app.use((req, res, next) => {
// 	res.setHeader("X-Frame-Options", "ALLOWALL");
// 	res.setHeader(
// 	  "Access-Control-Allow-Methods",
// 	  "POST, GET, PUT, DELETE, OPTIONS"
// 	);
  
// 	if (req.headers.origin) {
// 	  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
// 	}
  
// 	res.setHeader("Access-Control-Allow-Credentials", true);
  
// 	res.setHeader(
// 	  "Access-Control-Allow-Headers",
// 	  "Authorization, Origin, X-Requested-With, Content-Type, Accept"
// 	);
// 	next();
//   });

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/screen1.html');
});

app.get('/screen2/:gameId', (req, res) => {
	res.sendFile(__dirname + '/public/screen2.html');
});
app.get("/api", (req, res) => {

	console.log(req.session);
	console.log(req.sessionID);
	

	res.send("Api router");
});
//api/images
app.use("/api/citizens",citizenRouter );
app.use("/api/auth", authRouter);


// Middleware
app.use((req, res, next) => {
	console.log("404");
	res.send("404");
});

const port = 2323;
app.listen(port, (err) => {
	if(err) console.log(err)
	else console.log("Listen at port " + port);
});