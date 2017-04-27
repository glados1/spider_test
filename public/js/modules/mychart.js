(function($){
	var dao = require('../data/dao');
	var ejs = require('ejs');
	var mod = {
		initSocket : function(){
			var socket = io.connect();
			mod.socket = socket;
			this.initListen();
			this.bindEvents();
		},

		// 初始化监听
		initListen : function(){
			this.getMessageListen();
		},

		userLogin : function(){
			var username = $("[name='username']").val();
			var socket = mod.socket;

			socket.on('login_success', function(){
				$('.mychart_login_box').html("<div class='login_success'>登陆成功</div>");
				setTimeout(function(){
					$('.mychart_login_box').fadeOut(500);
					$('.overlay').fadeOut(500);
				},500);
			});

			socket.on('login_error', function(retData){
				var data = JSON.parse(retData);

				$('.login_error').addClass('show');
			});

			socket.emit('login', {
				username : username
			});
		},
		sendMessage : function(){
			var socket = mod.socket;
			var content = $('.message_input').val();

			$('.message_input').val('');

			var message = {
				content : content
			};

			socket.emit('sendMessage', JSON.stringify(message));
		},
		getMessageListen : function(){
			var socket = mod.socket;
			var _self = this;

			socket.on('getMessage', function(retData){
				var data = JSON.parse(retData);
				_self.displayNewMessage(data);
			});

		},
		displayNewMessage : function(data){
			var template = '<li class="message_item"><div class="message_user"><%=author%></div><div class="message_content"><%=content%></div></li>';
			var str = ejs.render(template, {
				author : data.author,
				content : data.content
			});

			$('.message_box').append(str);
		},
		bindEvents : function(){
			var _self = this;

			// 提交用户名
			$("[name='submit']").on('click', function(event){
				event.preventDefault();
				_self.userLogin();
				return false;
			});

			// 发送消息
			$('.message_input').on('keyup', function(event){
				if(event.ctrlKey && event.keyCode == 13 ){
					_self.sendMessage();
				}
			});
		},
		init : function(){
			this.initSocket();
		}
	};

	
	mod.init();
})(jQuery);