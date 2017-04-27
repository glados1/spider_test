// 客户端登录请求
var $ = require('jquery');
var querystring = require('querystring');

var mod = {};

// get 请求通用方法
function getDao(url, data){
	var defer = $.Deferred();
	var query = querystring.stringify(data);
	var URL = url + '?' + query;
	$.ajax({
		type : 'get',
		url : URL,
		success : function(data){
			defer.resolve(data);
		},
		error : function(err){
			defer.reject(err);
		}
	});

	return defer.promise();
}

// post 请求通用方法
function postDao(url, data){
	var defer = $.Deferred();
	var URL = url;
	$.ajax({
		type : 'post',
		url : URL,
		data : data,
		success : function(data){
			defer.resolve(data);
		},
		error : function(err){
			defer.reject(err);
		}
	});

	return defer.promise();
}

// 用户登录
mod.userLogin = function(obj){
	var username = obj.username || '';
	var password = obj.password || '';
	var defer = $.Deferred();
	postDao('/login',{
		username : username,
		password : password
	}).done(function(data){
		defer.resolve(data);
	}).fail(function(err){
		defer.reject(err);
	});

	return defer.promise();
};


module.exports = mod;