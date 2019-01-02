const href = window.location.href.split("#");
if (href.length > 1) {
	window.location.href = href[0];
}

const searchBtn = document.querySelector("#searchBtn") as HTMLButtonElement;
searchBtn.addEventListener("click", () => {
	fetch("/search", {
		method: "POST",
		headers: {
			accept: "application/json",
			"content-type": "application/json"
		},
		body: JSON.stringify({
			term: "mca"
		})
	})
		.then((res) => {
			return res.json();
		})
		.then((results) => {
			alert(JSON.stringify(results));
		});
});

// const socket = io("https://ecommerce.example.com:5050");
// // 'connection' event wil be received by the server (for "io.on('connection')")
// socket.on("news", (data) => {
// 	console.log(data);
// });
// socket.on("specific_event", (data) => {
// 	console.log(data);
// });

// const ioBtn = document.querySelector("#ioBtn") as HTMLButtonElement;
// ioBtn.addEventListener("click", () => {
// 	// Receive the 'news' event emitted from the server.
// 	socket.emit("others", {receive: "something"});
// });

const regForm = document.querySelector("#regForm") as HTMLFormElement;

regForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(regForm);
	let postData = {};
	formData.forEach((value, key) => {
		postData[key] = value;
	});
	fetch("auth/login", {
		method: "POST",
		headers: {
			accept: "application/json",
			"content-type": "application/json"
		},
		body: JSON.stringify(postData)
	})
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			console.log("DATATAT");
			console.log(data);
		});
});
