const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
// const Model =  mongoose.model;

const QuestionSchema = new Schema({
    questionContent:{type:String, required:true},
    yes:{type:Number, default:0},
    no:{type:Number, default:0}

  });

//   const QuestionModel =  mongoose.model("Question", QuestionSchema);  
//   QuestionModel.find({"questionContent":""}, (err,questions) =>{
//       if(err) console.log(err)
//       else console.log("q ", questions)
//   })
  module.exports = mongoose.model("Question", QuestionSchema);