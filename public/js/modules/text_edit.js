(function($){
	var mod = {
		init : function(){
			mod.initSocket();
			mod.bindEvents();
		},
		initSocket : function(){
			var socket = io.connect();
			mod.socket = socket;
			mod.initSocketEvent();
		},
		initSocketEvent : function(){
			var socket = mod.socket;

			socket.on('message_from_server', function(data){
				if(typeof data == 'string'){
					data = JSON.parse(data);
				}

				var message = data.data;

				$('.text_edit_content').val(message);
			});


		},
		bindEvents : function(){
			var socket = mod.socket;

			var sendMessage = function(){
				var text = $('.text_edit_content').val();
				var message = {
					data : text
				};
				socket.emit('message_from_client', JSON.stringify(message));
			};

			$('.text_edit_content').on('keyup', function(){
				sendMessage();
			});

			$('.text_edit_submit').on('click', function(){
				sendMessage();
			});
		}
	};

	mod.init();
})(jQuery);