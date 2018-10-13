getRamdomQuestion();

function getRamdomQuestion() {
  $.ajax({
    url: "http://localhost:3000/ramdomQuestion",
    type: "get",
    success: function (response) {
      $("#questionContent").text(response.questionContent);
      $(".answer_btn").data('questionID', response.id)
      $("#yes").text(response.yes)
      $("#no").text(response.no)

    },
    error: function (error) {

    },
  });
}



$("#switchquestion").on('click', function () {
  getRamdomQuestion();
});

$(".answer_btn").on('click', function () {
  $.ajax({
    url: 'http://localhost:3000/answer',
    type: "POST",
    
    data: $(this).data(),
    success: function (response) {
      if (response.success) {
        window.location.href = '/result';
      }

    },
    error: function (error) {

    },
  });
});
// $(".answer_btn").on('click', function () {
//   $.ajax({
//     url: 'http://localhost:3000/result',
//     type: "get",
    
//     success: function (response) {
//       if (response) {
//         window.location.href = '/result';
//       }

//     },
//     error: function (error) {

//     },
//   });
// });
$("#check").on('click', function () {
  $.ajax({
    url: 'http://localhost:3000/result',
    type: "get",
    
    success: function (response) {
      if (response) {
        window.location.href = '/result';
      }

    },
    error: function (error) {

    },
  });
});
