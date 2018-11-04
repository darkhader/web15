const express = require("express");;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/tk-hotgirl", { useCreateIndex: true, useNewUrlParser: true }, (err) => {
    if(err){
        console.log(err);
    } else{
        console.log("Connected");
    }
});

const userRouter = require("./routers/userRouters");
const imageRouter = require("./routers/imageRouters");
const commentRouter = require("./routers/commentRouters");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use("/api/users", userRouter);
app.use("/api/images", imageRouter);
app.use("/api/comments", commentRouter);

const port = 8888;
app.listen(port, (err) => {
    if(err){
        console.log(err);
    } else{
        console.log("Server is listening at port " + port);
    }
})
