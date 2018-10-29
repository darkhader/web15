const params = new URL(window.location.href).pathname.split("/");
const gameId = params[params.length - 1];
function loadRound(result) {
    $.ajax({
        url: "/gameDetail/" + gameId,
        type: "GET",  
        success: function (res) {
            if (res) {
                for (i = 0; i < result.rounds.length; i++) {
                    var oldRound =
                        `<tr>
                    <th scope="col">Round ${i}</th>
                    <th scope="col" id="player1">
                    <input data-row="${i}" data-column="0" type="number" class="form-control" value=${result.rounds[i][0]}>
                    </th>
                    <th scope="col" id="player2">
                    <input data-row="${i}" data-column="1" type="number" class="form-control" value=${result.rounds[i][1]}>
                    </th>
                    <th scope="col" id="player3">
                    <input data-row="${i}" data-column="2" type="number" class="form-control" value=${result.rounds[i][2]}>
                    </th>
                    <th scope="col" id="player4">
                    <input data-row="${i}" data-column="3" type="number" class="form-control" value=${result.rounds[i][3]}>
                    </th>
                </tr>`

                    $("#rounds").append(oldRound);
                }
            }
        },
        error: function () {
            console.log(error);
        }
    })
}

$.ajax({
    url: "/gameDetail/" + gameId,
    type: "GET",
    success: function (result) {
        if (result) {
            $("#player1").text(result.playerName1);
            $("#player2").text(result.playerName2);
            $("#player3").text(result.playerName3);
            $("#player4").text(result.playerName4);
            loadRound(result);
            tinhToan();
            addRound(result);
        }
    },
    error: function () {
        console.log(error);
    }
})
function tinhToan() {
    $.ajax({
        url: "/gameDetail/" + gameId,
        type: "GET",
        success: function (result) {
            if (result) {

                var diem1 = 0;
                var diem2 = 0;
                var diem3 = 0;
                var diem4 = 0;
                for (i = 0; i < result.rounds.length; i++) {
                    diem1 += result.rounds[i][0];
                    diem2 += result.rounds[i][1];
                    diem3 += result.rounds[i][2];
                    diem4 += result.rounds[i][3];
                }
                $("#player1Score").text(diem1);
                $("#player2Score").text(diem2);
                $("#player3Score").text(diem3);
                $("#player4Score").text(diem4);

            }
        },
        error: function () {
            console.log(error);
        }
    })

}
function addRound(result) {
    $("#addRound").on("click", function () {

        var newRound =
            `<tr>
            <th scope="col">Round ${result.rounds.length}</th>
            <th scope="col" id="player1">
            <input data-row="${result.rounds.length}" data-column="0" type="number" class="form-control" value=0>
            </th>
            <th scope="col" id="player2">
            <input data-row="${result.rounds.length}" data-column="1" type="number" class="form-control" value=0>
            </th>
            <th scope="col" id="player3">
            <input data-row="${result.rounds.length}" data-column="2" type="number" class="form-control" value=0>
            </th>
            <th scope="col" id="player4">
            <input data-row="${result.rounds.length}" data-column="3" type="number" class="form-control" value=0>
            </th>
        </tr>`
        $("#rounds").append(newRound);
        $.ajax({
            url: "/addRound/" + gameId,
            type: "POST",
            success: function (respond) {

                result.rounds.length += 1;
                tinhToan();
            },
            error: function (error) {
                console.log(error);
            }
        })
    })
    $(document).on("input", ".form-control", function () {
        $.ajax({
            url: "/update",
            type: "POST",
            data: { gameId: result._id, row: $(this).data("row"), column: $(this).data("column"), val: $(this).val() },
            success: function (res) {
                if (res.success) {

                    tinhToan();

                }
            },
            error: function (error) {
                console.log("err ko gui dc", error);
            }
        })
    })
}
