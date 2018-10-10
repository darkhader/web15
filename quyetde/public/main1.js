$("#switch").click(function(){
    $.get("/getQuestion", function(data, status){
        document.getElementById("question").innerHTML = data;
    });
});