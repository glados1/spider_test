var mod = {};




/**
*	控制器具体逻辑
*/

mod.showIndex = function(req, res, next){
	res.render('modules/sign_in', {
		layout : 'layputs/default'
	});
};




module.exports = mod;