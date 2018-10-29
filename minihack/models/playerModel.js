const mongoose = require('mongoose');
const Schema =  mongoose.Schema;
// const Model =  mongoose.model;

const ScoreSchema = new Schema({
    playerName1:{type:String},
   
    playerName2:{type:String},
    
    playerName3:{type:String},
    
    playerName4:{type:String},

    rounds:[[Number]],

   

  });
  module.exports = mongoose.model("Score", ScoreSchema);
//   const QuestionModel =  mongoose.model("Question", QuestionSchema);  
//   QuestionModel.find({"questionContent":""}, (err,questions) =>{
//       if(err) console.log(err)
//       else console.log("q ", questions)
//   })
 