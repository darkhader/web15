$("#form").on("submit", function (event) {
	event.preventDefault();
	let Data = {
		name: $("#name").val(),
		cmt: $("#cmt").val(),
		password: $("#password").val(),
		dob: $("#dob").val(),
		address: $("#address").val(),
		job: $("#job").val()
	}
	$.ajax({
		url: "http://localhost:2323/api/citizens",
		type: "POST",
		data: Data,
		success: function (response) {
             console.log("response", response);
			 console.log("Data", Data);
			 window.location.href = "/screen2/" +response.citizenId;
		},
		error: function (err) {
			console.log(err);
			
		}
	})
});