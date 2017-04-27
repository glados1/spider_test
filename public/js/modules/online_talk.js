(function($){
	var ejs = require('ejs');
	var mod = {
		global : {
			initRoomsTpl : '<% rooms.forEach(function(room){%><li><%=room%></li><% });  %>',
			createRoomTmpl : '<li><%=name%></li>',
			messageTmpl : '<li class="online_talk_message_item"><div class="author"><%=author%></div><div class="message"><%=message%></div></li>'
		},
		init : function(){
			mod.initSocket();
			mod.bindEvents();
			//mod.test();
		},
		test : function(){
			mod.displayMessage({
				author : 'author_2',
				message : 'message_1'
			});

			mod.changeCurrentRoom({
				name : 'now_room'
			});

			var socket = mod.socket;

			socket.on('test', function(data){
				console.log(data);
			});


		},	
		initSocket : function(){
			var socket = io.connect();
			mod.socket = socket;
			mod.io = io;
			mod.initSocketEvent();
		},
		initSocketEvent : function(){
			var socket = mod.socket;
			// 收到服务器返回的消息
			socket.on('message_from_server', function(messageObj){
				if(typeof messageObj == 'string'){
					messageObj = JSON.parse(messageObj);
				}

				switch(messageObj.action){
					case 'change_username': 
						mod.changeUsername(messageObj.data);
						break;
					case 'online_talk_message':
						mod.onlineTalkMessage(messageObj.data);
						break;
					case 'create_room':
						mod.createRoom(messageObj.data);
						break;
					case 'join_room':
						mod.joinRoom(messageObj.data);
						break;
					default:
						console.log('action not found');
						break;
				}
			});

			// 初始化房间列表
			socket.on('rooms_init', function(messageObj){
				if(typeof messageObj == 'string'){
					messageObj = JSON.parse(messageObj);
				}

				var rooms = messageObj.data;

				mod.initRooms(rooms);

			});

			socket.on('rooms_update', function(messageObj){
				if(typeof messageObj == 'string'){
					messageObj = JSON.parse(messageObj);
				}

				var rooms = messageObj.data;

				mod.initRooms(rooms);

			});

		},

		// 展示收到的信息
		displayMessage : function(messageObj){
			var html = mod.getMessageHtml(messageObj);
			$('.online_talk_message').append(html);
		},

		// 初始化房间列表
		initRooms : function(rooms){
			var tmpl = mod.global.initRoomsTpl;
			var html = ejs.render(tmpl, {
				rooms : rooms
			});
			$('.online_talk_room_content').html(html);
		},

		// 改变当前房间
		changeCurrentRoom : function(roomObj){
			if(typeof roomObj == 'string'){
				roomObj = JSON.parse(roomObj);
			}

			var name = roomObj.name;

			$('.current_room').text(name);
		},

		// 改变用户名
		changeUsername : function(userObj){
			if(typeof userObj == 'string'){
				userObj = JSON.parse(userObj);
			}

			var username = userObj.username;

			mod.displayMessage({
				author : 'system',
				message : 'your name change to ' + username
			});
		},	

		// 在线聊天消息
		onlineTalkMessage :  function(onlineTalkMessageObj){

			if(typeof onlineTalkMessageObj == 'string'){
				onlineTalkMessageObj = JSON.parse(onlineTalkMessageObj);
			}

			mod.displayMessage(onlineTalkMessageObj);
		},

		// 创建房间
		createRoom : function(roomObj){
			if(typeof roomObj == 'string'){
				roomObj = JSON.parse(roomObj);
			}

			if(roomObj.room_status == 'new_room'){
				var html = ejs.render(mod.global.createRoomTmpl, roomObj);
				$('.online_talk_room_content').append(html);
			}

			mod.changeCurrentRoom(roomObj);

			if(roomObj.room_status == 'old_room'){
				mod.displayMessage({
					author : 'system',
					message : 'room has been exist, now you join the room ' + roomObj.name
				});
			} else {
				mod.displayMessage({
					author : 'system',
					message : 'you create the room ' + roomObj.name
				});
			}
			
		},

		// 加入房间
		joinRoom : function(roomObj){
			if(typeof roomObj == 'string'){
				roomObj = JSON.parse(roomObj);
			}

			if(roomObj.room_status == 'new_room'){
				var html = ejs.render(mod.global.createRoomTmpl, roomObj);
				$('.online_talk_room_content').append(html);
			}

			mod.changeCurrentRoom(roomObj);
			
			if(roomObj.room_status == 'old_room'){
				mod.displayMessage({
					author : 'system',
					message : 'room has been exist, now you join the room ' + roomObj.name
				});
			} else {
				mod.displayMessage({
					author : 'system',
					message : 'you create the room ' + roomObj.name
				});
			}
			
		},

		// 客户端的发送消息
		sendMessage : function(){
			var messageObj = {
				message : $('.online_talk_input').val()
			};

			var socket = mod.socket;
			socket.emit('message_from_client', JSON.stringify(messageObj));
		},
		getMessageHtml : function(messageObj){
			var tmpl = mod.global.messageTmpl;
			return ejs.render(tmpl, messageObj);
		},
		bindEvents : function(){

			// 绑定快捷键发送
			$('.online_talk_input').on('keyup', function(event){
				if(event.ctrlKey && event.keyCode == 13){
					mod.sendMessage();
				}
			});

			// 点击加入房间
			$('.online_talk_room_content').on('click', 'li', function(){
				var room_name = $(this).text();
				var socket = mod.socket;
				socket.emit('message_from_client', {
					message : '/join_room ' + room_name
				});
			});
		}
	};

	mod.init();
})(jQuery);