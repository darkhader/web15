const maxLength = 200;
$("#QuestionContent").on('input', function () {
    
    var remainChar = maxLength -$("#QuestionContent").val().length;
    $("#remain").text(remainChar)
});

// $("#switch").click(function(){
//     $.get("/getQuestion", function(data, status){
//         document.getElementById("question").innerHTML = data;
//     });
