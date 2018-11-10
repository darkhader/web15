// const promiseExp = () => {
// 	return new Promise((resolve, reject) => {
// 		setTimeout(function() {
// 			resolve("Trả tiền");
// 		}, 5000);
// 		setTimeout(function() {
// 			reject("Đ trả đấy!!!");
// 		}, 3000);
// 	});
// }

// promiseExp()
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((err) => {
// 		console.log("Error: ", err);
// 	})

const muaRau = (money) => new Promise((resolve, reject) => {
	if(money > 10000) {
		console.log("Da mua rau xong");
		resolve("Rau cua chau day!");
	} else reject("D ban!!");
});

const anRau = () => new Promise((resolve, reject) => {
	setTimeout(function() {
		console.log("Da an rau xong");
		resolve("An xong roi!!");
	}, 5000);
});

// console.log("Bat dau mua rau!");
// muaRau(10001)
// 	.then((response) => {
// 		console.log(response);
// 		return anRau();
// 	})
// 	.then((response) => {
// 		console.log(response);
// 	})
// 	.catch((err) => {
// 		console.log("Error: ", err);
// 	});
// console.log("Xong!");

const asyncFunction = async () => {
	try {
		console.log("Bat dau mua rau!");
		let muaRauResult = await muaRau(1000);
		console.log(muaRauResult);
		console.log("Da co rau!");
		let anRauResult = await anRau();
		console.log(anRauResult);
		console.log("Xong!");
	} catch (error) {
		console.log("Error! ", error);
	}
}

asyncFunction();