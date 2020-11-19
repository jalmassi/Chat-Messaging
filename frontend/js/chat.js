const url = 'http://localhost:8080';
let stompClient;
let selectedUser;
let newMessage = new Map();

function connectToChat(userName){
	console.log("connecting to chat...");
	let socket = new SockJS(url + '/chat');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame){
		console.log("connected to: " + frame);
		stompClient.subscribe("/topic/messages/" + userName, function(response){
			let data = JSON.parse(response.body);
			console.log(data);
			if(selectedUser===data.fromLogin){
			    render(data.message, data.fromLogin);
		    }else{
		        newMessage.set(data.fromLogin, data.message); //store messages from new users in map
		        $('#userNameAppender_'+data.fromLogin).append('<span >+1</span>')
		    }
		});
	});
}

function sendMsg(from, text){
	stompClient.send("/app/chat/" + selectedUser, {}, JSON.stringify({
		fromLogin: from,
		message: text
	}));
}

function registration(){
	let userName = document.getElementById("userName").value;
	$.get(url + "/registration/" + userName, function(response){
		connectToChat(userName);
	}).fail(function(error){
		if(error.status === 400){
			alert("Login is already busy");
		}
	})
}

function selectUser(userName){
    console.log("selecting users: " + userName);
    selectedUser = userName;
    $('#selectedUserId').html(''); //empties text
    $('#selectedUserId').append('Chat with ' + userName);
}

function fetchAll(){
	$.get(url + "/fetchAllUsers", function(response){
		let users = response;
		let usersTemplateHTML = "";
		for(let i = 0; i<users.length; i++){
		    usersTemplateHTML = usersTemplateHTML
		        + '<a href="#" onclick="selectUser(\'' + users[i]+'\')"><li class="clearfix">\n' +
                     '<img alt="avatar" height="55px"\n' +
                          'src="https://rtfm.co.ua/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png"\n' +
                          'width="55px"/>\n' +
                     '<div class="about">\n' +
                         '<div id="usernameAppender_' + users[i] + '" class="name">' + users[i] + '</div>\n' +
                         '<div class="status">\n' +
                             '<i class="fa fa-circle online"></i>\n' +
                         '</div>\n' +
                     '</div>'
                 '</li></a>';
		}
		$('#usersList').html(usersTemplateHTML);
	});
}