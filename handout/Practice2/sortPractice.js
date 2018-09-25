function sort(input) {
    var temp = input[0];
    for (let i = 0; i < input.length - 1; i++) {
        for (let j = i + 1; j < input.length; j++) {
            if (input[i] > input[j]) {
                temp = input[j];
                input[j] = input[i];
                input[i] = temp;
            }
        }
    }
    return input;
}
