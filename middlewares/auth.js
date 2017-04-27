var mod = {

};

// 管理员身份认证
mod.adminCheck = function(req, res, next){
	var params = req.query || {};
	if(params && params.username == 'wjh' && params.password == '123'){
		next();
	} else {
		res.render('modules/error', {
			error : 1,
			message : 'this is an error'
		});
	}
};



module.exports = mod;