var mod = {};

var log4js = require('log4js');
var config = require('./config');

log4js.configure(config.log4Settings);


// 获取 logger
function getLogger(name, level) {
	var logger = log4js.getLogger(name);
	if(level) {
		logger.setLevel(level);
	}

	return logger;
}

/**
*	方法暴露
*/
mod.getLogger = getLogger;
mod.info = getLogger('info');
mod.normal = getLogger('normal');


// log4 生成的中间件，用于将默认系统日志输出到指定的文件
mod.loggerMiddleware = log4js.connectLogger(log4js.getLogger('default', {
	level : log4js.levels.INFO
}));

module.exports = mod;