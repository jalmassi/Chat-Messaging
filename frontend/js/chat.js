const url = 'http://localhost:8080';
let stompClient;
let selectedUser;

function connectToChat(userName){
	console.log("connecting to chat...");
	let socket = new SockJS(url + '/chat' + userName);
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame){
		console.log("connected to: " + frame);
		stompClient.subscribe("/topic/messages/" + userName, function(response){
			let data = JSON.parse(response.body);
			console.log(data);
		});
	});
}

function sendMsg(from, text){
	stompClient.send("/app/chat" + selectedUser, {}, JSON.stringify({
		fromLogin: from,
		message: text
	}));
}

function registration(){
	let userName = document.getElementById("userName").value;
	$.get(url + "/registration/" + userName, function(response){
		
	}).fail(function(error){
		if(error.status === 400){
			alert("Login is already busy");
		}
	})
}

function fetchAll(){
	
}