
function generate(testLengthArray) {
  var arrayOut = [];

  if (testLengthArray.length < 4) {
    for (var i = 0; i < testLengthArray.length; i++) {
      var input = createInput(testLengthArray[i]);
      var target = -5000 + Math.floor(Math.random() * 100000);
      var output = search(input, target);
      arrayOut.push({ "input": input, "target": target, "output": output });
      //console.log(arrayOut[i]);

    }
  }
  else {
    var input = createInput(testLengthArray[0]);
    var target = input[0] - 10000;
    var output = search(input, target);
    arrayOut.push({ "input": input, "target": target, "output": output });
    // console.log(arrayOut[0]);

    var input = createInput(testLengthArray[1]);
    var target = input[0];
    var output = search(input, target);
    arrayOut.push({ "input": input, "target": target, "output": output });
    // console.log(arrayOut[1]);
    var input = createInput(testLengthArray[2]);
    var target = input[input.length - 1];
    var output = search(input, target);
    arrayOut.push({ "input": input, "target": target, "output": output });
    // console.log(arrayOut[2]);
    var input = createInput(testLengthArray[3]);
    var target = input[Math.floor((Math.random() * (testLengthArray[3] - 2)) + 1)];
    var output = search(input, target);
    arrayOut.push({ "input": input, "target": target, "output": output });
    //console.log(arrayOut[3]);
    for (var i = 4; i < testLengthArray.length; i++) {
      var input = createInput(testLengthArray[i]);
      var target = -5000 + Math.floor(Math.random() * 100000);
      var output = search(input, target);
      arrayOut.push({ "input": input, "target": target, "output": output });
      // console.log(arrayOut[i]);
    }

  }

}

function createInput(number) {
  var input = [];
  input[0] = -5000 + Math.floor(Math.random() * 10000);
  for (var i = 1; i < number; i++) {
    input[i] = input[i - 1] + Math.floor((Math.random() * 50) + 1);
  }
  return input;
}




function search(input, target) {
  for (var i = 0; i < input.length; i++) {
    if (input[i] == target)
      return i;
  }
  return -1;
}

    
    
    
    

        
            
    
    
        
            
                
                
                
            
        
    
    
        
    
 
        
            
        
        
            
        
        
        

        
 
       
  


 


        

   


