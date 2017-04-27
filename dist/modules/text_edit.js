(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1])