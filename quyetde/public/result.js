$.ajax({
  url: "http://localhost:3000/resultquest",
  type: "get",
  success: function (response) {
    let totalVote = response.yes + response.no;
    $("#questionContent").text(response.questionContent);
    $('#total').text(totalVote);
    $('#yes').text(((response.yes/totalVote)*100).toFixed(2));
    $('#no').text(((response.no/totalVote)*100).toFixed(2));
    


  },
  error: function (error) {

  },
});
$('#switchquestion').on("click", function(){
  $.ajax({
    url: 'http://localhost:3000/result',
    type: 'GET',
    success: function(response){
      if(response){
        window.location.href = "/answer";
      }
    },
    error: function(err){
      console.log(err);
    }
  })
});