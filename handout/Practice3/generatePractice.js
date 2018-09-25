
function generate(input, target) {
    const map = [];
    var output = -1;
    var temp = input[0];
    for (let i = 0; i < input.length; i++) {

        if (input[i] == target)
            output = i + 1;
    }
    for (let i = 0; i < input.length - 1; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[i] > input[j]) {
                temp = input[j];
                input[j] = input[i];
                input[i] = temp;
            }
        }
    }
    for (let i = 0; i < input.length; i++) {
        map[i] = input[i];
    }
 if (map.length >= 4) {
        if (output == -1) {
            console.log("input doesn't contain target")
        }
        if (output == 1) {
            console.log("target is at index 0")
        }
        if (output == map.length-1) {
            console.log("target is at index input.length-1")
        }
        else if (output != 1 && output!= map.length-1) {
            console.log("target` is NOT at index `0` or `input.length-1")
        }
    }


    return {
        input: map,
        target: target,
        output: output
    }
   
}

