'use strict'

function search(input, target) {
 for(let i=0; i<input.length; i++) {
       if(input[i]>=input[i+1]){
           break;
       }
        if (input[i] == target) return i+1;
    } 
    return -1;
}

//function include(arr, obj) {
//    for(var i=0; i<arr.length; i++) {
//        if (arr[i] == obj) return true;
//    }
//}