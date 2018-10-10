const maxLength = 200;
const questionContent= document.getElementById("QuestionContent");
const remainCharElem = document.getElementById("remain");
const chymCharElem = document.getElementById("chym");
questionContent.addEventListener('input', function () {
    
    var remainChar = maxLength - questionContent.value.length;
    remainCharElem.innerText=remainChar;
})

function test(){
    const fileDataSync =fs.readFileSync('randomQues.txt',{
        encoding:'utf-8'
     });
     var dataObj = JSON.parse(fileDataSync);
    
     chymCharElem.innerText =11;
}

   
