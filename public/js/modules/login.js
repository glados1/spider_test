(function($){
	var dao = require('../data/dao');
	var mod = {
		userLogin : function(username, password){
			dao.userLogin({
				username : username,
				password : password
			}).done(function(data){
				console.log(data);
			});
		},
		bindEvents : function(){
			var _self = this;
			console.log('this is a test of task');
			$('#login').on('click',function(){
				var username = $('#username').val();
				var password = $('#password').val();
				_self.userLogin(username, password);
			});
		},
		init : function(){
			this.bindEvents();
		}
	};

	
	mod.init();
})(jQuery);