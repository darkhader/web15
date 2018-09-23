
// function aFuncion(a){
// 	console.log("ĐZ"+a);

// }
// //first class function
// var bFuncion = function(name, print){
// print(name)
//  console.log("KHoai To");
// }

// bFuncion();



//Call back
// function add5(getNumber, print){
// 	var num = getNumber()+5;
// 	print(num);
// }
// function rdNum(){
// 	return Math.floor(Math.random()*1000);

// }
// function pritnNumber(num){
// 	console.log(num);
// }

// //add5(rdNum, pritnNumber)


// setTimeout(function(){
//     add5(rdNum,pritnNumber);}, 1000*1);



// console.log("Chiu Hoy")



// var a = 10;
// function abc(){
// 	var b=15;
// 	console.log(a)
// 	console.log(b)
// }
// abc()
// 	console.log(a)
// 	console.log(b)

// 	//b la funcion scope

// function printNum(num, waitTime){
// 	setTimeout(function(){
// 			console.log(i)
			
// 		},
// 		 waitTime*1000
// 		 );
// }
// function countDown(num){
// 	var i =num;
// 	for(i; i>=0;i--){
		
// printNum(i, num-i)
// 	}
// 	}


//let i la 1 Block scope
	function countDown(num){
	
	for(let i=num; i>=0;i--){
setTimeout(function(){
			console.log(i)
			
		},
		 (num-i)*1000
		 );
}}
	countDown(5);


	// bien global vut ben ngoai goi la global scope hoac vut o trong thi ko dung var 